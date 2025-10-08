'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Project } from '@/types';
import { LayoutGrid, PlusCircle } from 'lucide-react';
import Swal from 'sweetalert2';

function ItemSkeleton() {
  return (
    <div className="p-4 border rounded flex justify-between items-center animate-pulse">
      <div className="space-y-2">
        <div className="h-5 w-56 bg-muted rounded"></div>
        <div className="h-4 w-72 bg-muted rounded"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-5 w-12 bg-muted rounded"></div>
        <div className="h-5 w-16 bg-muted rounded"></div>
      </div>
    </div>
  );
}

export default function ManageProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch(error) {
      toast.error("Could not fetch projects.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This project will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      background: '#1e1e1e',
      color: '#f5f5f5',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'px-4 py-2 rounded-lg font-semibold',
        cancelButton: 'px-4 py-2 rounded-lg font-semibold',
      },
    });

    if (!result.isConfirmed) return;

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
      setProjects(currentProjects => currentProjects.filter(p => p._id !== id));
      await fetch(`/api/revalidate?path=/&token=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`);
      await fetch(`/api/revalidate?path=/projects&token=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}`);
      console.log("Revalidation triggered for projects.");
    } catch (error) {
      toast.error('Could not delete the project.', { id: toastId });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
            <LayoutGrid className="h-8 w-8 text-primary" />
            Manage Projects
        </h1>
        <Link href="/dashboard/projects/create" className="bg-primary text-primary-foreground py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <PlusCircle className="h-5 w-5" />
          Create New Project
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <>
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
          </>
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <div key={project._id} className="p-4 border rounded flex justify-between items-center transition-all hover:shadow-md">
              <div>
                <h2 className="font-bold text-lg">{project.title}</h2>
                <p className="text-sm text-muted-foreground">{project.technologies.join(', ')}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link href={`/dashboard/projects/edit/${project._id}`} className="text-blue-500 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold text-muted-foreground">No Projects Found</h3>
            <p className="text-muted-foreground mt-2">Get started by creating a new project.</p>
          </div>
        )}
      </div>
    </div>
  );
}
