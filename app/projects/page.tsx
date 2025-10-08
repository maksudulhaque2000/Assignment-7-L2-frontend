import { Suspense } from 'react';
import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/section-title';
import { Project } from '@/types';
import AllProjects from '@/components/sections/AllProjects';
import { ProjectCardSkeleton } from '@/components/ui/ProjectCardSkeleton';

export const metadata: Metadata = {
  title: "My Projects | Haque's Portfolio",
  description: "A complete showcase of my projects, including web applications, case studies, and personal work.",
};

async function ProjectDataFetcher() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) return <p className="text-center text-red-500">Failed to fetch projects.</p>;
    
    const projects: Project[] = await res.json();
    return <AllProjects projects={projects} />;

  } catch (error) {
    console.error("Error fetching projects:", error);
    return <p className="text-center text-red-500">Error loading projects. Please try again later.</p>;
  }
}

function ProjectsLoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
            ))}
        </div>
    );
}

export default function ProjectsPage() {
  return (
    <section id="all-projects" className="py-24 md:py-32 flex justify-center">
      <div className="container px-4 md:px-6 flex flex-col items-center">
        <SectionTitle
          title="All Projects"
          subtitle="Browse through all of my work, from full-stack applications to frontend experiments."
        />
        <div className="mt-12 w-full">
          <Suspense fallback={<ProjectsLoadingSkeleton />}>
            <ProjectDataFetcher />
          </Suspense>
        </div>
      </div>
    </section>
  );
}