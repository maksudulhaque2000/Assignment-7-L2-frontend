'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Project } from '@/types';

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
    } catch(error) {
        toast.error("Could not fetch projects.");
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    const toastId = toast.loading('Deleting project...');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete');
      
      toast.success('Project deleted successfully', { id: toastId });
      fetchProjects();
    } catch (error) {
      toast.error('Could not delete the project.', { id: toastId });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link href="/dashboard/projects/create" className="bg-primary text-primary-foreground p-2 rounded">
          Create New Project
        </Link>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <h2 className="font-bold">{project.title}</h2>
              <p className="text-sm text-muted-foreground">{project.technologies.join(', ')}</p>
            </div>
            <div className="flex gap-4">
              <Link href={`/dashboard/projects/edit/${project._id}`} className="text-blue-500">Edit</Link>
              <button onClick={() => handleDelete(project._id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}