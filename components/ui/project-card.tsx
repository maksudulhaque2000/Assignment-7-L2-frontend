'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from '@/lib/motion-wrapper';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/components/sections/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
}

export function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const { title, description, imageUrl, technologies, githubUrl, liveUrl, featured } = project;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md",
        featured && "md:col-span-2"
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              Featured Project
            </Badge>
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow p-5 md:p-6 space-y-4">
        <h3 className="text-xl font-bold">{title}</h3>
        
        <p className="text-muted-foreground flex-grow">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-secondary/50">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-3 pt-4 mt-auto">
          <Button asChild variant="outline" size="sm" className="gap-1">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-1" />
              Code
            </Link>
          </Button>
          
          {liveUrl && (
            <Button asChild variant="default" size="sm" className="gap-1">
              <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Live Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}