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
    title: "Roadmap to Success: Implementing Our Software Solutions",
    body: "A Fortune 100 Pharmaceutical case study exploring the transition to a self-regulated, enterprise pay equity model. Presented by Christopher W Martin.",
    bulletPoints: [
      "Strategic needs assessment and solution alignment.",
      "8-week enterprise project plan and execution.",
      "Proactive risk management and governance framework.",
      "Global methodology training and immediate ROI."
    ]
  },
  {
    id: "slide-1-the-catalyst",
    title: "Introduction: The Catalyst",
    body: "An internal priority on fairness and equity drove the need for a nimble, real-time evaluation platform.",
    bulletPoints: [
      "Shift away from point-in-time, reactive audits.",
      "Prepare for upcoming global job architecture realignments.",
      "Empower internal teams to self-regulate pay fairness.",
      "Enable proactive responses to shifting legal landscapes."
    ]
  },
  {
    id: "slide-2-business-goals",
    title: "Introduction: Business Goals",
    body: "The core objective was global risk mitigation by eliminating the impact of ungoverned pay changes.",
    bulletPoints: [
      "Gain total control over model inputs and evaluation criteria.",
      "Deliver higher confidence in mathematical outputs.",
      "Significantly reduce analysis turnaround time.",
      "Establish a consistent, repeatable global governance framework."
    ]
  },
  {
    id: "slide-3-discovery",
    title: "Needs Assessment: Discovery",
    body: "Initial discovery focused on assessing the customer's historical comfort with pay equity analyses and defining project success.",
    bulletPoints: [
      "Evaluated past reliance on external consultants and lawyers.",
      "Defined success via optimized remediation budgets.",
      "Established analysis coverage targets for the employee population.",
      "Identified key requirements for multi-national model designs."
    ]
  },
  {
    id: "slide-4-regulatory-complexity",
    title: "Needs Assessment: Compliance",
    body: "The solution required deep configuration to meet the unique multi-national regulatory demands of the pharmaceutical industry.",
    bulletPoints: [
      "Addressed existing and evolving global pay regulations.",
      "Educated stakeholders on legal defensibility of the software.",
      "Demonstrated the statistical rigor of out-of-the-box methodologies.",
      "Adapted to unique industry-specific workforce footprints."
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
    body: "Established a transparent, weekly operating cadence driven by clear expectations and mutual accountability.",
    bulletPoints: [
      "VP of Total Rewards: Primary champion and success stakeholder.",
      "Implementation Manager: Led SSO, integrations, and training.",
      "HRIS/IT: Managed Workday and ATS data integration pipelines.",
      "End-Users: Comp, Legal, and HRBPs adopted the new system."
    ]
  },
  {
    id: "slide-7-risk-data",
    title: "Risk Management: Data Integrity",
    body: "Proactively mitigated incomplete HRIS and payroll data risks without derailing the 8-week timeline.",
    bulletPoints: [
      "Provided clear expectations for minimum data requirements.",
      "Dedicated weekly calls strictly to data review and gap analysis.",
      "Ran continuous integration tests via Workday ISU.",
      "Ensured secure authentication and ISU system management."
    ]
  },
  {
    id: "slide-8-risk-scope",
    title: "Risk Management: Scope Creep",
    body: "Navigated timeline shifts caused by evolving business priorities, such as active M&A activity.",
    bulletPoints: [
      "Established a core working team to maintain project momentum.",
      "Locked in foundational integration readiness requirements.",
      "Clearly defined core roles to protect against external delays.",
      "Aligned shifting priorities with realistic milestone targets."
    ]
  },
  {
    id: "slide-9-training-methodology",
    title: "Training: Methodology Enablement",
    body: "Delivered an intense, hands-on learning model designed to transition the team away from external consultants.",
    bulletPoints: [
      "Utilized the customer's live data to validate statistical models.",
      "Taught interpretation of results and equity issue resolution.",
      "Built trust in the platform's mathematical output.",
      "Transitioned users away from black-box consulting models."
    ]
  },
  {
    id: "slide-10-training-adoption",
    title: "Training: Global Adoption",
    body: "Scaled the enablement strategy across multiple timezones through targeted resource development.",
    bulletPoints: [
      "Developed internal Subject Matter Experts (SMEs) to upskill teams.",
      "Supplied on-demand video tracking the customer journey.",
      "Created tailored tracks for Comp, Talent Acquisition, and HR.",
      "Supported localized teams with scheduled drop-in office hours."
    ]
  },
  {
    id: "slide-11-immediate-outcomes",
    title: "Conclusion: Immediate Outcomes",
    body: "Successfully delivered a complete global pay equity analysis and remediation strategy within the target 8-week window.",
    bulletPoints: [
      "Finalized direct Workday integration for automated updates.",
      "Deployed comprehensive training plans across Americas, EMEA, and APAC.",
      "Established strategic 6-month and 12-month compliance milestones.",
      "Completed initial remediation strategy within 8 weeks."
    ]
  },
  {
    id: "slide-12-long-term-value",
    title: "Conclusion: Long-Term Value",
    body: "The platform immediately proved its ROI by enabling the customer to navigate complex structural changes efficiently.",
    bulletPoints: [
      "Completed multiple regulatory reports across global jurisdictions.",
      "Reviewed two major acquisition populations for job framework equity.",
      "Achieved sustained self-regulation for ongoing fairness.",
      "Eliminated the financial drag of annual consultant fees."
    ]
  }
];
