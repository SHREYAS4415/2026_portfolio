export const config = { on: "formSubmitted" };

export default async function portfolioLead(event) {
  const { ga_client_id: clientId, ga_session_id: sessionId } = event.data ?? {};
  const secret = process.env.GA4_API_SECRET;

  // Only the portfolio contact form declares these consent-gated fields.
  if (!secret || !/^\d{1,20}\.\d{1,20}$/.test(clientId ?? "") ||
      !/^\d{1,12}$/.test(sessionId ?? "")) return;

  const endpoint = new URL("https://www.google-analytics.com/mp/collect");
  endpoint.searchParams.set("measurement_id", "G-SPZWKGKYVE");
  endpoint.searchParams.set("api_secret", secret);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        consent: { ad_user_data: "DENIED", ad_personalization: "DENIED" },
        events: [{
          name: "generate_lead",
          params: {
            session_id: Number(sessionId),
            engagement_time_msec: 1,
            form_id: "portfolio-contact",
            ...(process.env.GA4_DEBUG_MODE === "true" ? { debug_mode: 1 } : {}),
          },
        }],
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) console.error("GA4 lead event failed", response.status);
  } catch {
    console.error("GA4 lead event request failed");
  }
}
