export interface Education {
  id: number;
  degree: string;
  institution: string;
  duration: string;
  description: string;
  achievements: string[];
  certificate?: string;
}

export const educationData: Education[] = [
  {
    id: 1,
    degree: "Honours 3rd Year (Accounting)",
    institution: "Demra University College - DUC",
    duration: "2021-Present",
    description: "Currently pursuing a Bachelor of Honours degree in Accounting. Core coursework includes financial accounting, taxation, and auditing standards.",
    achievements: [
      "Consistently maintained a strong academic record.",
      "Actively participated in departmental seminars and workshops.",
    ],
    certificate: undefined,
  },
  {
    id: 2,
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Dania University College",
    duration: "2018 - 2020",
    description: "Completed Higher Secondary Certificate with a major in Business Studies, gaining a solid foundation in accounting, finance, and management.",
    achievements: [
      "GPA: 3.92/5.00"
    ],
    certificate: 'HSC Certificate.pdf',
  },
  {
    id: 3,
    degree: "Secondary School Certificate (SSC)",
    institution: "Barnomala Adarsha High School And College",
    duration: "2016 - 2018",
    description: "Completed Secondary School Certificate with a major in Business Studies, focusing on accounting, finance, and business entrepreneurship.",
    achievements: [
      "GPA: 3.67/5.00"
    ],
    certificate: 'SSC Certificate.pdf',
  }
];