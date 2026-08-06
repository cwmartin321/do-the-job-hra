export type SlideData = {
  id: string;
  title: string;
  body: string;
  bulletPoints?: string[];
};

export const slides: SlideData[] = [
  {
    id: "slide-1-intro",
    title: "Introduction",
    body: "Implementing an enterprise pay equity software platform for a Fortune 100 multinational pharmaceutical company.",
    bulletPoints: [
      "Transition away from manual, consultant-led audits.",
      "Run seamless, on-demand pay equity analyses.",
      "Determine fair starting pay for new hires.",
      "Ensure ongoing compliance with labor regulations."
    ]
  },
  {
    id: "slide-2-needs-assessment",
    title: "Needs Assessment",
    body: "The organization lacked internal agility, relying heavily on expensive external consultants and slow manual processes.",
    bulletPoints: [
      "Deliver high-speed, on-demand analysis capabilities.",
      "Configure to unique compensation structures.",
      "Provide hands-on implementation and methodology support.",
      "Eliminate reliance on clunky consulting models."
    ]
  },
  {
    id: "slide-3-project-plan",
    title: "Project Plan",
    body: "A structured 8-week implementation timeline ensuring accurate data collection, customization, and seamless deployment.",
    bulletPoints: [
      "Weeks 1-2: Initiation and Needs Mapping.",
      "Weeks 3-4: HRIS Data Extraction and Configuration.",
      "Weeks 5-6: Regression Testing and Training.",
      "Weeks 7-8: Go-Live and Ongoing Monitoring."
    ]
  },
  {
    id: "slide-4-team-roles",
    title: "Team Roles",
    body: "A highly collaborative partnership between the software implementation team and the customer's internal experts.",
    bulletPoints: [
      "Implementation Manager: Led project architecture and customization.",
      "VP of Total Rewards: Provided executive sponsorship.",
      "Compensation Analyst: Managed HRIS data extraction."
    ]
  },
  {
    id: "slide-5-risk-management",
    title: "Risk Management",
    body: "Proactively addressed data integrity issues and managed the change from external consultants to internal software.",
    bulletPoints: [
      "Risk: Incomplete or inaccurate demographic data.",
      "Mitigation: Conducted dedicated data review workshops.",
      "Risk: Internal hesitation regarding new methodologies.",
      "Mitigation: Maintained transparency and continuous monitoring."
    ]
  },
  {
    id: "slide-6-training-plan",
    title: "Training Plan",
    body: "Focused on technical navigation and underlying pay equity methodology to ensure complete team self-sufficiency.",
    bulletPoints: [
      "Eliminated reliance on external consultants.",
      "Conducted hands-on system navigation training.",
      "Enabled accurate execution of regression analyses.",
      "Taught interpretation of outputs for disparities."
    ]
  },
  {
    id: "slide-7-conclusion",
    title: "Conclusion",
    body: "Successfully transitioned the customer to a high-speed, self-sufficient ecosystem for ongoing equity compliance.",
    bulletPoints: [
      "Delivered fully customized platform in 8 weeks.",
      "Enabled immediate, on-demand starting pay calculations.",
      "Drastically reduced audit turnaround times.",
      "Empowered the internal compensation team."
    ]
  }
];
