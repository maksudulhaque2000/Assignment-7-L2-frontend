'use client';

import { useEffect, useState } from 'react';
import ProjectForm from '../../ProjectForm';
import { Project } from '@/types';

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${params.id}`);
      const data = await res.json();
      setProject(data);
    };
    fetchProjectData();
  }, [params.id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <ProjectForm existingProject={project} />
    </div>
  );
}