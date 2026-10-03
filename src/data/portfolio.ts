export const links: {
  email: string | null;
  linkedin: string | null;
  resume: string | null;
} = {
  email: "shreyasym4415@gmail.com",
  linkedin: "https://www.linkedin.com/in/shreyas-y-m-34a121215/",
  resume: "/resume/Shreyas_YM_Resume.pdf",
};
export const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Architecture", href: "/#architecture" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "#contact" },
];
export const scope = [
  {
    title: "Mobile Architecture",
    text: "Product journeys, system boundaries and cross-platform application structure.",
  },
  {
    title: "Fintech Systems",
    text: "Identity, verification, payment and investment journeys connected to service behavior.",
  },
  {
    title: "Production Engineering",
    text: "Integration, migration, release and reliability of production mobile applications.",
  },
];
export const selectedWork = [
  "Food delivery",
  "Clinic / appointment / coupon systems",
  "Salon / service platforms",
];
export const career = ["Matrical Technologies", "Creddinv"];
export const leadership =
  "Across professional work, I led or coordinated around 14 developers and trained around 10 interns into developers or production contributors, alongside code review and implementation guidance.";
export const stories = [
  {
    id: "identity",
    title: "Identity / KYC orchestration",
    problem: "Different identity journeys and provider boundaries.",
    decision: "Separate journey state from provider handoff.",
    consequence: "Provider return is not automatically authoritative.",
    evidence:
      "DigiLocker, PAN validation and Didit; detailed evidence pending.",
  },
  {
    id: "failure",
    title: "Failure architecture / reliability",
    problem: "Technical failures cross several application layers.",
    decision: "Carry typed failures through explicit contracts.",
    consequence: "Preserve existing Failure instances through propagation.",
    evidence: "Failure, FailureMapper, NetworkGuard and Either<Failure, T>.",
  },
  {
    id: "migration",
    title: "Production migration / release engineering",
    problem: "A revamp must meet an existing production boundary.",
    decision:
      "Review application and native release responsibilities together.",
    consequence:
      "A successful build alone does not establish release readiness.",
    evidence: "Live product; exact shipped migration mechanics pending.",
  },
  {
    id: "payment",
    title: "Payment orchestration",
    problem: "Participation needs more than one payment path.",
    decision: "Keep the investment journey independent of a single provider.",
    consequence: "Razorpay and external UPI handoffs remain distinct concerns.",
    evidence:
      "Payment paths supplied; reconciliation and return-state evidence pending.",
  },
];

export const homepageStories = [
  {
    id: "session",
    title: "Session / resumable onboarding",
    problem:
      "Interrupted onboarding can leave returning investors without a clear continuation point.",
    decision:
      "Treat onboarding progress as recoverable application state and resolve continuation from persisted backend progress.",
    consequence:
      "Returning investors resume at the appropriate profile, KYC or authenticated step instead of restarting the onboarding journey.",
    evidence:
      "Session restoration, backend profile progress and centralized route resolution implemented in the v2.0 application.",
  },
  stories[0],
  stories[1],
  stories[3],
  stories[2],
];

export const architecturalLens = {
  concerns: [
    "Session / lifecycle",
    "Identity orchestration",
    "Integration boundaries",
    "Failure handling",
    "Payment orchestration",
    "Production / release",
  ],
  statement:
    "Every visible product moment carries architectural responsibility beneath the surface — from session continuity and identity orchestration to integration boundaries, failure handling, payment flows and production delivery. These concerns are shared across the application, shaping how the product behaves, recovers and reaches production.",
};
