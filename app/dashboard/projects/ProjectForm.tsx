'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Project } from '@/types';

export default function ProjectForm({ existingProject }: { existingProject?: Project }) {
  const [formData, setFormData] = useState({
    title: existingProject?.title || '',
    description: existingProject?.description || '',
    imageUrl: existingProject?.imageUrl || '',
    liveUrl: existingProject?.liveUrl || '',
    githubUrl: existingProject?.githubUrl || '',
    category: existingProject?.category || 'fullstack',
    technologies: existingProject?.technologies?.join(', ') || '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading(existingProject ? 'Updating project...' : 'Creating project...');

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()),
    };

    const url = existingProject
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${existingProject._id}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`;
      
    const method = existingProject ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error('Operation failed');

      toast.success(existingProject ? 'Project updated!' : 'Project created!', { id: toastId });
      await fetch(`/api`);
      await fetch(`/api/projects`);
      router.push('/dashboard/projects');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong.', { id: toastId });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Title</label>
        <input name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mt-1 h-24" required />
      </div>
      <div>
        <label>Image URL</label>
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
      </div>
      <div>
        <label>Live URL</label>
        <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
      </div>
      <div>
        <label>GitHub URL</label>
        <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
      </div>
      <div>
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded mt-1">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Full Stack</option>
        </select>
      </div>
      <div>
        <label>Technologies (comma separated)</label>
        <input name="technologies" value={formData.technologies} onChange={handleChange} className="w-full p-2 border rounded mt-1" required />
      </div>
      <button type="submit" className="bg-primary text-primary-foreground p-2 rounded">
        {existingProject ? 'Update Project' : 'Create Project'}
      </button>
    </form>
  );
}