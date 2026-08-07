export type SlideData = {
  id: string;
  title: string;
  body: string;
  bulletPoints?: string[];
  component?: "GanttChart";
};

export const slides: SlideData[] = [
  {
    id: "slide-0-cover",
    title: "Roadmap to Success:\nImplementing Pay Equity Software",
    body: "A Fortune 100 Pharmaceutical case study exploring my execution of their transition to a self-regulated, enterprise pay equity model.\n\nPresented by: Chris Martin",
    bulletPoints: [
      "My approach to strategic needs assessment and solution alignment.",
      "How I managed the 8-week enterprise project plan and execution.",
      "The proactive risk management and governance framework I implemented.",
      "My strategy for global methodology training to deliver immediate ROI."
    ]
  },
  {
    id: "slide-1-the-catalyst",
    title: "Introduction: The Catalyst",
    body: "The client prioritized fairness and equity, which drove my implementation of a nimble, real-time evaluation platform.",
    bulletPoints: [
      "I helped them shift away from point-in-time, reactive audits.",
      "I laid the groundwork for their upcoming global job architecture realignments.",
      "I empowered their internal teams to self-regulate pay fairness.",
      "I enabled them to proactively respond to shifting legal landscapes."
    ]
  },
  {
    id: "slide-2-business-goals",
    title: "Introduction: Business Goals",
    body: "My core objective was global risk mitigation by eliminating the impact of ungoverned pay changes for the client.",
    bulletPoints: [
      "I gave them total control over model inputs and evaluation criteria.",
      "I delivered higher confidence in their mathematical outputs.",
      "I significantly reduced their analysis turnaround time.",
      "I established a consistent, repeatable global governance framework for them."
    ]
  },
  {
    id: "slide-3-discovery",
    title: "Needs Assessment: Discovery",
    body: "I led the initial discovery phase, focusing on the customer's historical comfort with pay equity analyses to define my project's success criteria.",
    bulletPoints: [
      "I evaluated their past reliance on external consultants and lawyers.",
      "I defined project success by targeting optimized remediation budgets.",
      "I established aggressive analysis coverage targets for their employee population.",
      "I identified and gathered key requirements for their multi-national model designs."
    ]
  },
  {
    id: "slide-4-regulatory-complexity",
    title: "Needs Assessment: Compliance",
    body: "I drove a deep configuration of the solution to meet the unique, multi-national regulatory demands of the pharmaceutical industry.",
    bulletPoints: [
      "I addressed their existing and evolving global pay regulations.",
      "I educated stakeholders on the legal defensibility of our software.",
      "I demonstrated the statistical rigor of our out-of-the-box methodologies.",
      "I adapted the models to their unique, industry-specific workforce footprints."
    ]
  },
  {
    id: "slide-5-project-plan",
    title: "Project Plan",
    body: "",
    component: "GanttChart"
  },
  {
    id: "slide-6-team-roles",
    title: "Governance & Team Roles",
    body: "I established a transparent, weekly operating cadence driven by clear expectations and mutual accountability across all stakeholders.",
    bulletPoints: [
      "VP of Total Rewards: My primary champion and success stakeholder.",
      "Implementation Manager (Me): I led SSO, integrations, and training.",
      "HRIS/IT: I guided them to manage Workday and ATS data integration pipelines.",
      "End-Users: I onboarded Comp, Legal, and HRBPs to adopt the new system."
    ]
  },
  {
    id: "slide-7-risk-data",
    title: "Risk Management: Data Integrity",
    body: "I proactively mitigated incomplete HRIS and payroll data risks to ensure we didn't derail my 8-week timeline.",
    bulletPoints: [
      "I provided clear expectations for their minimum data requirements.",
      "I dedicated our weekly calls strictly to data review and gap analysis.",
      "I ran continuous integration tests via their Workday ISU.",
      "I ensured their secure authentication and ISU system management."
    ]
  },
  {
    id: "slide-8-risk-scope",
    title: "Risk Management: Scope Creep",
    body: "I successfully navigated timeline shifts caused by their evolving business priorities, such as active M&A activity.",
    bulletPoints: [
      "I established a core working team to maintain my project's momentum.",
      "I locked in foundational integration readiness requirements early.",
      "I clearly defined core roles to protect my timeline against external delays.",
      "I aligned their shifting priorities with my realistic milestone targets."
    ]
  },
  {
    id: "slide-9-training-methodology",
    title: "Training: Methodology Enablement",
    body: "I delivered an intense, hands-on learning model designed to transition the client's team away from external consultants.",
    bulletPoints: [
      "I utilized the customer's live data to help them validate statistical models.",
      "I taught their teams the interpretation of results and equity issue resolution.",
      "I built their trust in the platform's mathematical output.",
      "I successfully transitioned users away from black-box consulting models."
    ]
  },
  {
    id: "slide-10-training-adoption",
    title: "Training: Global Adoption",
    body: "I scaled my enablement strategy across multiple timezones through targeted resource development.",
    bulletPoints: [
      "I developed internal Subject Matter Experts (SMEs) to upskill their teams.",
      "I supplied on-demand video tracking their specific customer journey.",
      "I created tailored learning tracks for their Comp, Talent Acquisition, and HR teams.",
      "I supported localized teams by hosting scheduled drop-in office hours."
    ]
  },
  {
    id: "slide-11-immediate-outcomes",
    title: "Conclusion: Immediate Outcomes",
    body: "I successfully delivered a complete global pay equity analysis and remediation strategy within my target 8-week window.",
    bulletPoints: [
      "I finalized direct Workday integration for their automated updates.",
      "I deployed comprehensive training plans across the Americas, EMEA, and APAC.",
      "I established their strategic 6-month and 12-month compliance milestones.",
      "I helped them complete their initial remediation strategy within 8 weeks."
    ]
  },
  {
    id: "slide-12-long-term-value",
    title: "Conclusion: Long-Term Value",
    body: "My implementation immediately proved its ROI by enabling the customer to navigate complex structural changes efficiently.",
    bulletPoints: [
      "They completed multiple regulatory reports across global jurisdictions using my setup.",
      "They reviewed two major acquisition populations for job framework equity.",
      "I helped them achieve sustained self-regulation for ongoing fairness.",
      "My work eliminated the financial drag of their annual consultant fees."
    ]
  }
];
