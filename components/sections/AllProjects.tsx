'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types';
import { Input } from '@/components/ui/input';
import { ProjectCard } from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PROJECTS_PER_PAGE = 6;

const categories = [
  { value: 'all', label: 'All' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'fullstack', label: 'Full Stack' },
];

export default function AllProjects({ projects }: { projects: Project[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, searchTerm]);

  const filteredProjects = projects
    .filter(project => 
      currentCategory === 'all' || project.category === currentCategory
    )
    .filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const currentProjectsToDisplay = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      document.getElementById('all-projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="all" onValueChange={(value) => setCurrentCategory(value)} className="w-full">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-12">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            {categories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value}>
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="w-full max-w-xs">
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <TabsContent value={currentCategory}>
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
            <p className="text-center py-8 text-muted-foreground">No projects found matching your criteria.</p>
          )}

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center space-x-1 sm:space-x-2">
              <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} variant="outline" size="sm">
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <Button key={number} onClick={() => paginate(number)} variant={currentPage === number ? "default" : "outline"} size="sm">
                  {number}
                </Button>
              ))}
              <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} variant="outline" size="sm">
                Next
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}