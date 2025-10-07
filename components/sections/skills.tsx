'use client';

import { useState, useEffect } from 'react';
import { motion } from '@/lib/motion-wrapper';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '@/components/ui/section-title';
import { Badge } from '@/components/ui/badge';
import { skills, Skill } from '@/data/skills';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Skills' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'other', label: 'Other' },
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter((skill) => skill.category === selectedCategory);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <SectionTitle
          title="Technical Skills"
          subtitle="Technologies and tools I work with to bring ideas to life"
        />

        <div ref={ref} className="mt-12">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className="text-sm md:text-base"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                    inView={inView}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  inView: boolean;
}

function SkillCard({ skill, index, inView }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="flex flex-col p-5 rounded-lg bg-card border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{skill.name}</h3>
        <Badge 
          variant="secondary" 
          className={`
            ${skill.category === 'frontend' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' : ''} 
            ${skill.category === 'backend' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100' : ''} 
            ${skill.category === 'other' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100' : ''}
          `}
        >
          {skill.category}
        </Badge>
      </div>
      
      <div className="w-full bg-secondary h-2 rounded-full mt-auto">
        <div 
          className={`
            h-full rounded-full 
            ${skill.category === 'frontend' ? 'bg-blue-500 dark:bg-blue-400' : ''} 
            ${skill.category === 'backend' ? 'bg-emerald-500 dark:bg-emerald-400' : ''} 
            ${skill.category === 'other' ? 'bg-amber-500 dark:bg-amber-400' : ''}
          `}
          style={{ width: `${skill.level * 10}%` }}
        ></div>
      </div>
      <div className="text-right text-xs text-muted-foreground mt-1">
        {skill.level * 10}%
      </div>
    </motion.div>
  );
}