export type TimelineItem = {
  dateLabel?: string;
  title: string;
  institution: string;
  startYear?: number;
  endYear?: number | 'Present';
  description: string;
  details: string;
  type: 'education' | 'experience';
}

// Manually transcribed from the owner’s LinkedIn profile. Projects are maintained separately.
export const timelineItems: TimelineItem[] = [
  {
    title: "Contract Analyst", institution: "R1 RCM", type: "experience",
    startYear: 2025, endYear: "Present", dateLabel: "Jun 2025 – Present",
    description: "Analyze healthcare billing and payer mapping data, create quality check pipelines, and develop reports on billing information and data quality.",
    details: "Apply my software engineering background to build Python and Streamlit apps in Databricks and Snowflake, using Spark in Databricks to work with billing data and payer mappings. Use SQL for analysis and quality checks, and create Power BI reports on billing information and data quality.",
  },
  {
    title: "Master’s in Cyber Security", institution: "Liberty University", type: "education",
    startYear: 2024, endYear: 2026, dateLabel: "Aug 2024 – May 2026",
    description: "Graduate study in cybersecurity with a focus on cyber/computer forensics and counterterrorism.",
    details: "Developed technical skills in Linux, network analysis with Nmap and Wireshark, and digital forensics tools including Forensic Toolkit (FTK) and PRTK.",
  },
  {
    title: "Recruitment Specialist", institution: "Liberty University", type: "experience",
    startYear: 2023, endYear: 2025, dateLabel: "Oct 2023 – Jun 2025",
    description: "Managed and maintained the student recruitment database, using SQL and Excel to support recruitment operations.",
    details: "Worked with Power Automate for recruitment email workflows and SharePoint alongside database management and maintenance.",
  },
  {
    title: "Software Engineer Capstone (CSCN 481 & 482)", institution: "Liberty University", type: "experience",
    startYear: 2022, endYear: 2023, dateLabel: "Aug 2022 – May 2023",
    description: "Developed a social media application with the PERN stack as part of a five-person Agile team.",
    details: "Pioneered a social media development framework using the PERN stack, improving application performance and user experience. Facilitated Agile software development for a team of five and integrated database solutions into full-stack applications to enhance scalability and performance.",
  },
  {
    title: "Event Staff", institution: "Liberty University", type: "experience",
    startYear: 2022, endYear: 2023, dateLabel: "Feb 2022 – May 2023",
    description: "Supported university events through teamwork, communication, and event management.",
    details: "Applied communication and coordination skills in a part-time event support role at Liberty University.",
  },
  {
    title: "Computer Science, Software Engineering", institution: "Liberty University", type: "education",
    startYear: 2019, endYear: 2023, dateLabel: "Jan 2019 – May 2023",
    description: "Studied computer science and software engineering, building the programming and application development foundation I now apply to data tools and analytics.",
    details: "Developed web application skills with HTML5 and Node.js, connecting frontend development with server-side programming.",
  },
  {
    title: "IT Specialist / Web Developer", institution: "Aquathermic Colombia", type: "experience",
    startYear: 2019, endYear: 2019, dateLabel: "May 2019 – Aug 2019",
    description: "Provided IT support and worked on web development for Aquathermic Colombia.",
    details: "",
  },
];
