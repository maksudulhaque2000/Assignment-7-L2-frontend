

export interface Project {
  _id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  featured?: boolean;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}