export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'other';
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 9, category: 'frontend' },
  { name: 'Next.js', level: 8, category: 'frontend' },
  { name: 'TypeScript', level: 9, category: 'frontend' },
  { name: 'JavaScript', level: 9, category: 'frontend' },
  { name: 'HTML/CSS', level: 9, category: 'frontend' },
  { name: 'Tailwind CSS', level: 8, category: 'frontend' },
  { name: 'Redux', level: 7, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 8, category: 'backend' },
  { name: 'Express', level: 8, category: 'backend' },
  { name: 'MongoDB', level: 7, category: 'backend' },
  { name: 'PostgreSQL', level: 7, category: 'backend' },
  { name: 'REST APIs', level: 8, category: 'backend' },
  
  // Other
  { name: 'Git', level: 8, category: 'other' },
  { name: 'Docker', level: 7, category: 'other' },
  { name: 'Postman', level: 8, category: 'other' },
  { name: 'AWS', level: 6, category: 'other' },
  { name: 'CI/CD', level: 7, category: 'other' },
  { name: 'Testing', level: 7, category: 'other' },
];