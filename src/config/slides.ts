export type SlideData = {
  id: string;
  title: string;
  body: string;
  layout?: 'default' | 'icon-grid' | 'split' | 'process' | 'stats' | 'quote' | 'value-drivers' | 'pillars';
  bulletPoints?: string[];
  iconGridItems?: { icon: string; title: string; text: string }[];
  processSteps?: { title: string; description: string; icon?: string }[];
  splitContent?: { image?: string; icon?: string; sideText?: string };
  stats?: { value: string; label: string }[];
  valueDrivers?: { title: string; description: string; visual: '4x' | 'retention' | 'regulatory' | 'satisfaction' }[];
  pillars?: { icon: string; title: string; description: string }[];
  quote?: { text: string; author: string };
  component?: "GanttChart";
};

export const slides: SlideData[] = [
  {
    id: "slide-0-cover",
    title: "Roadmap to Success:\nImplementing Pay Equity Software",
    body: "A Fortune 100 Pharmaceutical case study exploring my execution of their transition to a self-regulated, enterprise pay equity model.\n\nPresented by: *Chris Martin*",
    layout: 'default',
    bulletPoints: [
      "My approach to strategic needs assessment and solution alignment.",
      "How I managed the 8-week enterprise project plan and execution.",
      "The proactive risk management and governance framework I implemented.",
      "My strategy for global methodology training to deliver immediate ROI."
    ]
  },
  {
    id: "slide-1-the-catalyst",
    title: "Introduction: ~~The Catalyst~~",
    body: "The client prioritized fairness and equity, which drove my implementation of a nimble, real-time evaluation platform.",
    layout: 'process',
    processSteps: [
      { title: "Reactive to Proactive", description: "Shifted away from point-in-time, reactive audits to continuous evaluation.", icon: "Activity" },
      { title: "Global Alignment", description: "Laid the groundwork for upcoming global job architecture realignments.", icon: "Globe" },
      { title: "Internal Empowerment", description: "Empowered internal teams to self-regulate pay fairness.", icon: "ShieldCheck" },
      { title: "Legal Resilience", description: "Enabled proactive responses to shifting legal landscapes.", icon: "Scale" }
    ]
  },
  {
    id: "slide-2-business-goals",
    title: "Introduction: ~~Business Goals~~",
    body: "My core objective was global risk mitigation by eliminating the impact of ungoverned pay changes for the client.",
    layout: 'icon-grid',
    iconGridItems: [
      { icon: "SlidersHorizontal", title: "Total Control", text: "Gave them total control over model inputs and evaluation criteria." },
      { icon: "CheckCircle", title: "High Confidence", text: "Delivered higher confidence in their mathematical outputs." },
      { icon: "Zap", title: "Faster Turnaround", text: "Significantly reduced their analysis turnaround time." },
      { icon: "Network", title: "Global Framework", text: "Established a consistent, repeatable global governance framework." }
    ]
  },
  {
    id: "slide-3-discovery",
    title: "Needs Assessment: ~~Discovery~~",
    body: "I led the initial discovery phase, focusing on the customer's historical comfort with pay equity analyses to define my project's success criteria.",
    layout: 'split',
    splitContent: { icon: "Search", sideText: "Discovery Phase & Requirements Gathering" },
    bulletPoints: [
      "I evaluated their past reliance on external consultants and lawyers.",
      "I defined project success by targeting optimized remediation budgets.",
      "I established aggressive analysis coverage targets for their employee population.",
      "I identified and gathered key requirements for their multi-national model designs."
    ]
  },
  {
    id: "slide-4-regulatory-complexity",
    title: "Needs Assessment: ~~Compliance~~",
    body: "I drove a deep configuration of the solution to meet the unique, multi-national regulatory demands of the pharmaceutical industry.",
    layout: 'icon-grid',
    iconGridItems: [
      { icon: "Globe", title: "Global Regulations", text: "Addressed their existing and evolving global pay regulations." },
      { icon: "Shield", title: "Legal Defensibility", text: "Educated stakeholders on the legal defensibility of our software." },
      { icon: "BarChart3", title: "Statistical Rigor", text: "Demonstrated the statistical rigor of our out-of-the-box methodologies." },
      { icon: "Briefcase", title: "Industry Models", text: "Adapted the models to their unique, industry-specific workforce footprints." }
    ]
  },
  {
    id: "slide-5-project-plan",
    title: "Project Plan",
    body: "",
    layout: 'default',
    component: "GanttChart"
  },
  {
    id: "slide-6-team-roles",
    title: "Governance & ~~Team Roles~~",
    body: "I established a transparent, weekly operating cadence driven by clear expectations and mutual accountability across all stakeholders.",
    layout: 'icon-grid',
    iconGridItems: [
      { icon: "Crown", title: "VP of Total Rewards", text: "My primary champion and success stakeholder." },
      { icon: "UserCog", title: "Implementation Manager", text: "I led SSO, integrations, and comprehensive platform training." },
      { icon: "Database", title: "HRIS/IT", text: "I guided them to manage Workday and ATS data integration pipelines." },
      { icon: "Users", title: "End-Users", text: "I onboarded Comp, Legal, and HRBPs to adopt the new system." }
    ]
  },
  {
    id: "slide-7-risk-data",
    title: "Risk Management: ~~Data Integrity~~",
    body: "I proactively mitigated incomplete HRIS and payroll data risks to ensure we didn't derail my 8-week timeline.",
    layout: 'process',
    processSteps: [
      { title: "Define Requirements", description: "Provided clear expectations for their minimum data requirements.", icon: "FileText" },
      { title: "Gap Analysis", description: "Dedicated our weekly calls strictly to data review and gap analysis.", icon: "Search" },
      { title: "Integration Testing", description: "Ran continuous integration tests via their Workday ISU.", icon: "RefreshCw" },
      { title: "System Security", description: "Ensured their secure authentication and ISU system management.", icon: "Lock" }
    ]
  },
  {
    id: "slide-8-risk-scope",
    title: "Risk Management: ~~Scope Creep~~",
    body: "I successfully navigated timeline shifts caused by their evolving business priorities, such as active M&A activity.",
    layout: 'split',
    splitContent: { icon: "Compass", sideText: "Navigating Organizational Shifts" },
    bulletPoints: [
      "I established a core working team to maintain my project's momentum.",
      "I locked in foundational integration readiness requirements early.",
      "I clearly defined core roles to protect my timeline against external delays.",
      "I aligned their shifting priorities with my realistic milestone targets."
    ]
  },
  {
    id: "slide-9-training-methodology",
    title: "Training: ~~Methodology~~",
    body: "I delivered an intense, hands-on learning model designed to transition the client's team away from external consultants.",
    layout: 'icon-grid',
    iconGridItems: [
      { icon: "Database", title: "Live Data Validation", text: "Utilized the customer's live data to help them validate statistical models." },
      { icon: "LineChart", title: "Results Interpretation", text: "Taught their teams the interpretation of results and equity issue resolution." },
      { icon: "ShieldCheck", title: "Building Trust", text: "Built their trust in the platform's mathematical output." },
      { icon: "LogOut", title: "Consultant Transition", text: "Successfully transitioned users away from black-box consulting models." }
    ]
  },
  {
    id: "slide-10-training-adoption",
    title: "Training: ~~Global Adoption~~",
    body: "I scaled my enablement strategy across multiple timezones through targeted resource development.",
    layout: 'stats',
    stats: [
      { value: "SMEs", label: "Developed internal subject matter experts to upskill teams." },
      { value: "On-Demand", label: "Supplied video tracking their specific customer journey." },
      { value: "Tailored", label: "Created learning tracks for Comp, TA, and HR teams." },
      { value: "Flexible", label: "Supported localized teams with scheduled drop-in office hours." }
    ]
  },
  {
    id: "slide-11-immediate-outcomes",
    title: "Conclusion: ~~Immediate Outcomes~~",
    body: "I successfully delivered a complete global pay equity analysis and remediation strategy within my target 8-week window.",
    layout: 'pillars',
    pillars: [
      { title: "Workday Integration", description: "Finalized direct Workday integration for their automated updates.", icon: "Link" },
      { title: "Global Training", description: "Deployed comprehensive training plans across the Americas, EMEA, and APAC.", icon: "Globe" },
      { title: "Compliance Milestones", description: "Established their strategic 6-month and 12-month compliance milestones.", icon: "Flag" },
      { title: "Remediation Strategy", description: "Helped them complete their initial remediation strategy within 8 weeks.", icon: "CheckCircle" }
    ]
  },
  {
    id: "slide-12-long-term-value",
    title: "Conclusion: ~~Long-Term Value~~",
    body: "My implementation immediately proved its ROI by enabling the customer to navigate complex structural changes efficiently.",
    layout: 'icon-grid',
    iconGridItems: [
      { icon: "FileCheck", title: "Regulatory Reporting", text: "They completed multiple regulatory reports across global jurisdictions." },
      { icon: "Building", title: "M&A Readiness", text: "They reviewed two major acquisition populations for job framework equity." },
      { icon: "Scale", title: "Sustained Fairness", text: "I helped them achieve sustained self-regulation for ongoing fairness." },
      { icon: "TrendingDown", title: "Cost Reduction", text: "My work eliminated the financial drag of their annual consultant fees." }
    ]
  },
  {
    id: "slide-13-value-drivers",
    title: "Conclusion: ~~Value Drivers~~",
    body: "The platform's true ROI is rooted in its ability to transform pay equity from a reactive legal burden into a proactive strategic advantage.",
    layout: 'value-drivers',
    valueDrivers: [
      { title: "Review Frequency", description: "Increase fairness review frequency by 4x, rather than maintaining a yearly cadence.", visual: "4x" },
      { title: "Talent Retention", description: "Work toward higher retention by prioritizing fairness in total comp and pay packages.", visual: "retention" },
      { title: "Risk Mitigation", description: "Avoid costly regulatory penalties and burdens through continuous monitoring.", visual: "regulatory" },
      { title: "Employee Trust", description: "Improve employee satisfaction and trust by increasing organizational transparency.", visual: "satisfaction" }
    ]
  },
  {
    id: "slide-14-appendix",
    title: "Appendix: ~~The Presentation as a Product~~",
    body: "We replaced the static deck with a live, interactive application to demonstrate how modern tools can transform standard client check-ins into highly collaborative experiences.",
    layout: 'icon-grid',
    iconGridItems: [
      { icon: "Laptop", title: "Premium Experience", text: "A dynamic, fully-branded interface elevates the brand and commands client attention during implementation." },
      { icon: "Hand", title: "Frictionless Feedback", text: "The persistent 'hand raise' allows clients to signal confusion instantly without interrupting the flow." },
      { icon: "MessageSquare", title: "Live Collaboration", text: "Real-time commenting captures all notes, questions, and alignment directly within the presentation." },
      { icon: "Download", title: "Actionable Takeaways", text: "Export the session into a persistent artifact, ensuring no client concern falls through the cracks." }
    ]
  }
];
