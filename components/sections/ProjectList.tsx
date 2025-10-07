'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/ui/project-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.3 } },
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
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory + currentPage} 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentProjectsToDisplay.length > 0 ? (
              currentProjectsToDisplay.map((project, index) => (
                <motion.div key={project._id} variants={itemVariants}>
                  <ProjectCard
                    project={project}
                    index={index}
                    inView={true}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 col-span-3"
              >
                No projects found for this category.
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
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
  );
}