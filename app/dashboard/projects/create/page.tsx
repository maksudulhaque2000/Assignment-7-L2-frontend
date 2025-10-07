// app/dashboard/projects/create/page.tsx
'use client';
import ProjectForm from '../ProjectForm';

export default function CreateProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create a New Project</h1>
      <ProjectForm />
    </div>
  );
}