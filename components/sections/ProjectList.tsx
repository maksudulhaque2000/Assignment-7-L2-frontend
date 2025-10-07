'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/ui/project-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';

const PROJECTS_PER_PAGE = 6;

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
];

export default function ProjectList({ allProjects }: { allProjects: Project[] }) {
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory]);

  const filteredProjects = currentCategory === 'all'
    ? allProjects
    : allProjects.filter(project => project.category === currentCategory);

  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const currentProjectsToDisplay = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Tabs defaultValue="all" onValueChange={(value) => setCurrentCategory(value)} className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className={`grid grid-cols-2 md:grid-cols-4`}>
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} className="text-sm md:text-base">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <TabsContent value={currentCategory} className="mt-0">
        {currentProjectsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProjectsToDisplay.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={index}
                inView={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-center py-8">No projects found for this category.</p>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
            <Button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <Button
                key={number}
                onClick={() => paginate(number)}
                variant={currentPage === number ? "default" : "outline"}
                size="sm"
              >
                {number}
              </Button>
            ))}
            <Button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}