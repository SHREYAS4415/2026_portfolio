import { links } from "../data/portfolio";

const measurementId = "G-SPZWKGKYVE";
const preferenceKey = "portfolio-analytics-consent";
const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"];

function preference(): string | null {
  try {
    return localStorage.getItem(preferenceKey);
  } catch {
    return null;
  }
}

function pageLocation(): string {
  const source = new URL(location.href);
  const sanitized = new URL(source.pathname, source.origin);
  for (const key of campaignKeys) {
    const value = source.searchParams.get(key);
    if (value && /^[a-z0-9][a-z0-9_-]{0,79}$/i.test(value)) {
      sanitized.searchParams.set(key, value);
    }
  }
  return sanitized.href;
}

function bindConsentForm(form: HTMLFormElement, isBanner: boolean) {
  const status = form.querySelector<HTMLElement>("[role=status]");
  if (isBanner) form.hidden = preference() !== null;
  else if (status) status.textContent = preference() === "granted" ? "Analytics allowed." : "Analytics off.";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!(event.submitter instanceof HTMLButtonElement)) return;
    const choice = event.submitter.value;
    if (choice !== "granted" && choice !== "denied") return;
    const previous = preference();

    try {
      localStorage.setItem(preferenceKey, choice);
    } catch {
      if (status) status.textContent = "Your browser could not save this preference.";
      return;
    }

    if (choice === "denied" && previous === "granted") {
      location.reload();
      return;
    }
    if (isBanner) form.hidden = true;
    if (!isBanner && status) status.textContent = choice === "granted" ? "Analytics allowed." : "Analytics off.";
    if (choice === "granted") startAnalytics();
  });
}

const privacy = document.querySelector<HTMLFormElement>("[data-analytics-preferences]");
const banner = document.querySelector<HTMLFormElement>("[data-analytics-consent]");
if (privacy) bindConsentForm(privacy, false);
else if (banner) bindConsentForm(banner, true);

let started = false;
if (preference() === "granted") startAnalytics();

function startAnalytics() {
  if (started || preference() !== "granted") return;
  started = true;
  const analyticsWindow = window as Window & { dataLayer?: IArguments[] };
  const dataLayer = (analyticsWindow.dataLayer ??= []);
  function gtag(..._args: unknown[]) {
    dataLayer.push(arguments);
  }

  const referrer = document.referrer ? new URL(document.referrer) : undefined;
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("js", new Date());
  gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: pageLocation(),
    page_referrer: referrer?.origin ?? "",
  });
  function track(name: string, params: Record<string, string> = {}) {
    if (preference() === "granted") gtag("event", name, params);
  }
  track("page_view");
  if (location.pathname.replace(/\/$/, "") === "/work/creddinv-v2") {
    track("case_study_view", { case_study_id: "creddinv-v2" });
  }

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
  document.head.append(tag);

  window.addEventListener("storage", (event) => {
    if (event.key === preferenceKey || event.key === null) location.reload();
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest("a[href]");
    if (!(anchor instanceof HTMLAnchorElement)) return;
    if (anchor.origin === location.origin && anchor.pathname === links.resume) {
      track("resume_click");
    } else if (anchor.protocol === "mailto:") {
      track("contact_click", { contact_channel: "email" });
    } else if (links.linkedin && anchor.origin === new URL(links.linkedin).origin) {
      track("contact_click", { contact_channel: "linkedin" });
    }
  });

  const contact = document.querySelector<HTMLFormElement>('form[name="portfolio-contact"]');
  if (contact) {
    const ids: Record<string, string> = {};
    function refreshIds() {
      for (const key of ["client_id", "session_id"]) {
        gtag("get", measurementId, key, (value: unknown) => {
          ids[key] = String(value ?? "");
        });
      }
    }
    refreshIds();
    contact.addEventListener("focusin", () => {
      track("lead_form_start", { form_id: "portfolio-contact" });
      refreshIds();
    }, { once: true });
    contact.addEventListener("formdata", (event) => {
      if (preference() !== "granted") return;
      if (!/^\d+\.\d+$/.test(ids.client_id ?? "") || !/^\d{1,12}$/.test(ids.session_id ?? "")) return;
      event.formData.set("ga_client_id", ids.client_id);
      event.formData.set("ga_session_id", ids.session_id);
    });
  }
}
