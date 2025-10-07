import { SectionTitle } from '@/components/ui/section-title';
import ProjectList from './ProjectList';
import { Project } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Projects | Haque's Portfolio",
  description: "A showcase of my recent work, including full-stack web applications, case studies, and personal projects.",
};

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch projects");
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="My Projects"
          subtitle="A showcase of my recent work from my own backend"
        />
        <div className="mt-12">
          <ProjectList allProjects={projects} />
        </div>
      </div>
    </section>
  );
}