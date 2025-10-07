export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export const experienceData: Experience[] = [
  {
    "id": 1,
    "title": "Project Intern (Data Archiving Lead)",
    "company": "Tappware Solution LTD",
    "location": "Dhaka, Bangladesh",
    "period": "May 2021 - July 2021",
    "description": [
      "Led a critical data archiving project as a team lead under a government contract with the National Revenue Board (NRB).",
      "Managed the end-to-end data migration and archiving process, ensuring high standards of data integrity and quality control.",
      "Successfully delivered the complete project, which significantly streamlined the government's audit procedures and data retrieval systems.",
      "Developed valuable skills in project management, team collaboration, and handling large-scale datasets in a professional environment."
    ],
    "technologies": [
      "Data Management",
      "Data Integrity",
      "Microsoft Excel",
      "SQL (for data verification)",
      "Project Management",
      "Team Leadership"
    ]
  },
  {
    "id": 2,
    "title": "Junior Web Developer",
    "company": "Creative Hub Digital",
    "location": "Remote",
    "period": "August 2022 - April 2023",
    "description": [
      "Developed responsive and user-friendly websites for various clients using fundamental web technologies.",
      "Translated UI/UX design mockups from Figma into clean, functional, and pixel-perfect code.",
      "Collaborated with senior developers to fix bugs, optimize website performance, and implement new features.",
      "Gained hands-on experience with version control systems like Git for team-based projects."
    ],
    "technologies": [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+)",
      "Bootstrap",
      "jQuery",
      "Git & GitHub",
      "Figma"
    ]
  }
];