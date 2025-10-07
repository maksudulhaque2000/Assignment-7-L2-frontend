// app/projects/page.tsx
import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/section-title';
import { Project } from '@/types';
import AllProjects from '@/components/sections/AllProjects';

export const metadata: Metadata = {
  title: "My Projects | Haque's Portfolio",
  description: "A complete showcase of my projects, including web applications, case studies, and personal work.",
};

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
      next: { revalidate: 3600 }, // প্রতি 1 ঘণ্টা পর ডেটা রিভ্যালিডেট হবে
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section id="all-projects" className="py-24 md:py-32 border border-red-800 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="All Projects"
          subtitle="Browse through all of my work, from full-stack applications to frontend experiments."
        />
        <div className="mt-12">
          <AllProjects projects={projects} />
        </div>
      </div>
    </section>
  );
}