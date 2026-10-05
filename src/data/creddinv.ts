export const metrics = [
  {
    value: "~20K",
    target: "20",
    format: "installs",
    label: "Combined Android + iOS downloads",
    short: "downloads",
  },
  { 
    value: "~4K", 
    target: "4",
    format: "mau",
    label: "Combined monthly active users", 
    short: "MAU" 
  },
  { 
    value: "4.5★+", 
    target: "4.5",
    format: "rating",
    label: "Google Play rating", 
    short: "Play rating" 
  },
];
export const journeys = [
  {
    title: "ACCESS & SECURITY",
    surface: "Login · OTP · Google / Apple · 2FA",
    copy: "Investors enter through supported authentication paths, including OTP-based login and social sign-in options. Two-factor authentication adds another layer of protection around account access.",
    highlight: "Multiple sign-in paths · 2FA-protected access",
  },
  {
    title: "ONBOARDING & INVESTOR IDENTITY",
    surface: "Registration · Profile · Investor type · Resume",
    copy: "Indian, NRI and International investors move through profile and identity requirements appropriate to their journey. Interrupted onboarding can continue from the appropriate completed state instead of restarting.",
    highlight: "Indian · NRI · International · resumable progress",
  },
  {
    title: "IDENTITY & KYC",
    surface: "PAN · DigiLocker · Didit · Verification state",
    copy: "Verification branches according to investor context. Provider completion is not treated as the final source of truth; the product continues according to verified backend KYC state.",
    highlight: "Differentiated verification · backend-confirmed state",
  },
  {
    title: "DISCOVERY & COMMITMENT",
    surface: "Campaign discovery · Detail · Commitment",
    copy: "Eligible investors explore live opportunities, evaluate campaign information and move into commitment. Supporting resources and knowledge content sit alongside the investment journey.",
    highlight: "Discover → evaluate → commit",
  },
  {
    title: "PAYMENTS",
    surface: "Razorpay · UPI / deep links · International",
    copy: "Payment remains a multi-path product journey. Supported investments can move through provider-backed flows, external UPI handoffs and international payment paths, with available experience and messaging driven by supported backend state.",
    highlight:
      "Multiple paths · international support · backend-driven experience",
  },
  {
    title: "POST-COMMITMENT & PORTFOLIO",
    surface: "Investment state · KYC docs · Payment status · Portfolio",
    copy: "The journey continues after commitment through investment status, campaign-level KYC requirements where applicable and portfolio visibility that connects transaction activity back into the longer-term investor experience.",
    highlight: "Commitment → post-commitment state → portfolio",
  },
];
export const journeyCapabilities = [
  "Resumable journeys",
  "Investor-type-aware flows",
  "Backend-driven states",
  "Multiple payment paths",
  "International support",
  "Notifications / status messaging",
  "Production session continuity",
];
export const productMoments = [
  "Registration",
  "Profile",
  "Identity / KYC",
  "Discovery",
  "Commitment",
  "Payment",
  "Portfolio",
];
export const concerns = [
  "Session / lifecycle",
  "Domain modelling",
  "Identity orchestration",
  "State management",
  "Integration boundaries",
  "Failure handling",
  "Payment orchestration",
  "Production lifecycle",
];
export const decisions = [
  {
    id: "session",
    title: "Session / resumable lifecycle",
    constraint:
      "Identity and onboarding continue across application lifecycles.",
    decision:
      "Treat session restoration and resumable onboarding as explicit architectural concerns. Interrupted onboarding is treated as recoverable product state. On return, the application restores backend profile progress and uses centralized route resolution to continue across profile completion, KYC or the authenticated home experience.",
    why: "Product continuity needs a clear source of session authority.",
    tradeoff: "More runtime transitions and recovery boundaries to review.",
    consequence:
      "Lifecycle behavior belongs in architecture review, alongside routing.",
    evidence:
      "Responsibility supplied; exact runtime transitions and restoration proof pending.",
  },
  {
    id: "identity",
    title: "KYC orchestration",
    constraint:
      "Indian, NRI and international users have differentiated identity journeys.",
    decision:
      "Separate application journey state, provider interaction and service authority.",
    why: "A provider return is not automatically an authoritative verification result.",
    tradeoff:
      "Multiple provider and journey boundaries require explicit review.",
    consequence:
      "DigiLocker, PAN validation and Didit fit within differentiated KYC journeys.",
    evidence:
      "Concepts supplied; exact provider-to-journey mapping and authority relationships pending.",
  },
  {
    id: "payment",
    title: "Payment orchestration",
    constraint: "Investment participation supports multiple payment paths.",
    decision:
      "Support Razorpay-backed paths and non-Razorpay UPI paths without coupling the journey to one provider.",
    why: "Provider choice should not define the entire investment journey.",
    tradeoff:
      "UPI intent/link creation, deep-link-based payment handoff and external UPI app handoff introduce integration boundaries.",
    consequence:
      "Payment initiation and provider handoff are separately reviewable responsibilities.",
    evidence:
      "Paths supplied; reconciliation, backend confirmation and return-state behavior are not established here.",
  },
  {
    id: "failure",
    title: "Failure architecture",
    constraint:
      "Network and application failures must cross layer boundaries predictably.",
    decision:
      "Use Failure, FailureMapper, NetworkGuard and Either<Failure, T>; preserve existing Failure instances.",
    why: "Repeated mapping can discard the meaning of an existing failure.",
    tradeoff: "Typed contracts require consistent handling at each boundary.",
    consequence: "Presentation can consume a deliberate failure contract.",
    evidence:
      "Architecture concepts supplied; reliability improvements are not quantified.",
  },
];
export const contribution = [
  "Mobile Application Architect responsibility",
  "HLD creation/review",
  "LLD creation/review",
  "Application architecture",
  "Clean Architecture",
  "BLoC architecture",
  "Repository/use-case boundaries",
  "Dependency injection",
  "Session/lifecycle architecture",
  "Resumable onboarding",
  "KYC orchestration",
  "Payment orchestration",
  "Failure architecture",
  "Production migration architecture",
  "Android/iOS production delivery",
  "Code review",
  "Architecture review",
  "Git-based workflows",
];
export const designLevels = [
  {
    title: "HLD",
    subtitle: "Responsibilities and relationships",
    items: [
      "System boundaries",
      "Mobile / backend / provider relationships",
      "Session",
      "Onboarding / KYC",
      "Payments",
      "Failure architecture",
      "Migration / release",
    ],
  },
  {
    title: "LLD",
    subtitle: "Contracts and runtime behavior",
    items: [
      "BLoC events / states",
      "Runtime transitions",
      "Routing",
      "Use-case / repository contracts",
      "Session restoration",
      "Failure propagation",
      "Provider-return handling",
      "Payment / deep-link behavior",
    ],
  },
];
export const readiness = [
  {
    title: "Platform identity",
    detail: "Review retained Android/iOS identity and native configuration.",
    status: "Shipped details pending",
  },
  {
    title: "Session and migration",
    detail:
      "Review existing-install and session continuity across the application boundary.",
    status: "Runtime proof pending",
  },
  {
    title: "Integrations",
    detail: "Review KYC, payments and deep-link configuration.",
    status: "Provider proof pending",
  },
  {
    title: "Release candidate",
    detail:
      "Review signing, version, environment and physical upgrade behavior.",
    status: "Artifact proof pending",
  },
];
export const chapters = [
  { id: "scope", title: "Product complexity" },
  { id: "journey", title: "Product journey" },
  { id: "context", title: "System context" },
  { id: "decisions", title: "Architecture decisions" },
  { id: "depth", title: "System depth" },
  { id: "migration", title: "Migration / release" },
  { id: "contribution", title: "Contribution" },
  { id: "outcomes", title: "Outcomes" },
];
