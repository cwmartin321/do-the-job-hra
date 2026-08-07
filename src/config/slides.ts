export type SlideData = {
  id: string;
  title: string;
  body: string;
  bulletPoints?: string[];
  component?: "GanttChart";
};

export const slides: SlideData[] = [
  {
    id: "slide-1-the-catalyst",
    title: "Introduction: The Catalyst",
    body: "An internal priority on fairness and equity drove the need for a nimble, real-time evaluation platform[cite: 2].",
    bulletPoints: [
      "Shift away from point-in-time, reactive audits[cite: 2].",
      "Prepare for upcoming global job architecture realignments[cite: 2].",
      "Empower internal teams to self-regulate pay fairness[cite: 2]."
    ]
  },
  {
    id: "slide-2-business-goals",
    title: "Introduction: Business Goals",
    body: "The core objective was global risk mitigation by eliminating the impact of ungoverned pay changes[cite: 2].",
    bulletPoints: [
      "Gain total control over model inputs and evaluation criteria[cite: 2].",
      "Deliver higher confidence in mathematical outputs[cite: 2].",
      "Significantly reduce analysis turnaround time[cite: 2]."
    ]
  },
  {
    id: "slide-3-discovery",
    title: "Needs Assessment: Discovery",
    body: "Initial discovery focused on assessing the customer's historical comfort with pay equity analyses and defining project success[cite: 2].",
    bulletPoints: [
      "Evaluated past reliance on external consultants and lawyers[cite: 2].",
      "Defined success via optimized remediation budgets[cite: 2].",
      "Established analysis coverage targets for the employee population[cite: 2]."
    ]
  },
  {
    id: "slide-4-regulatory-complexity",
    title: "Needs Assessment: Compliance",
    body: "The solution required deep configuration to meet the unique multi-national regulatory demands of the pharmaceutical industry[cite: 2].",
    bulletPoints: [
      "Addressed existing and evolving global pay regulations[cite: 2].",
      "Educated stakeholders on legal defensibility of the software[cite: 2].",
      "Demonstrated the statistical rigor of out-of-the-box methodologies[cite: 2]."
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
    body: "Established a transparent, weekly operating cadence driven by clear expectations and mutual accountability[cite: 2].",
    bulletPoints: [
      "VP of Total Rewards: Primary champion and success stakeholder[cite: 2].",
      "Implementation Manager: Led SSO, integrations, and training[cite: 2].",
      "HRIS/IT: Managed Workday and ATS data integration pipelines[cite: 2].",
      "End-Users: Comp, Legal, and HRBPs adopted the new system[cite: 2]."
    ]
  },
  {
    id: "slide-7-risk-data",
    title: "Risk Management: Data Integrity",
    body: "Proactively mitigated incomplete HRIS and payroll data risks without derailing the 8-week timeline[cite: 2].",
    bulletPoints: [
      "Provided clear expectations for minimum data requirements[cite: 2].",
      "Dedicated weekly calls strictly to data review and gap analysis[cite: 2].",
      "Ran continuous integration tests via Workday ISU[cite: 2]."
    ]
  },
  {
    id: "slide-8-risk-scope",
    title: "Risk Management: Scope Creep",
    body: "Navigated timeline shifts caused by evolving business priorities, such as active M&A activity[cite: 2].",
    bulletPoints: [
      "Established a core working team to maintain project momentum[cite: 2].",
      "Locked in foundational integration readiness requirements[cite: 2].",
      "Clearly defined core roles to protect against external delays[cite: 2]."
    ]
  },
  {
    id: "slide-9-training-methodology",
    title: "Training: Methodology Enablement",
    body: "Delivered an intense, hands-on learning model designed to transition the team away from external consultants[cite: 2].",
    bulletPoints: [
      "Utilized the customer's live data to validate statistical models[cite: 2].",
      "Taught interpretation of results and equity issue resolution[cite: 2].",
      "Built trust in the platform's mathematical output[cite: 2]."
    ]
  },
  {
    id: "slide-10-training-adoption",
    title: "Training: Global Adoption",
    body: "Scaled the enablement strategy across multiple timezones through targeted resource development[cite: 2].",
    bulletPoints: [
      "Developed internal Subject Matter Experts (SMEs) to upskill teams[cite: 2].",
      "Supplied on-demand video tracking the customer journey[cite: 2].",
      "Created tailored tracks for Comp, Talent Acquisition, and HR[cite: 2]."
    ]
  },
  {
    id: "slide-11-immediate-outcomes",
    title: "Conclusion: Immediate Outcomes",
    body: "Successfully delivered a complete global pay equity analysis and remediation strategy within the target 8-week window[cite: 2].",
    bulletPoints: [
      "Finalized direct Workday integration for automated updates[cite: 2].",
      "Deployed comprehensive training plans across Americas, EMEA, and APAC[cite: 2].",
      "Established strategic 6-month and 12-month compliance milestones[cite: 2]."
    ]
  },
  {
    id: "slide-12-long-term-value",
    title: "Conclusion: Long-Term Value",
    body: "The platform immediately proved its ROI by enabling the customer to navigate complex structural changes efficiently[cite: 2].",
    bulletPoints: [
      "Completed multiple regulatory reports across global jurisdictions[cite: 2].",
      "Reviewed two major acquisition populations for job framework equity[cite: 2].",
      "Achieved sustained self-regulation for ongoing fairness[cite: 2]."
    ]
  }
];
