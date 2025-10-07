'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/ui/section-title';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { experienceData } from '@/data/experience';
import { educationData, Education } from '@/data/education';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { motion } from '@/lib/motion-wrapper';
import { Button } from '@/components/ui/button';
import { useTabContext } from '@/context/TabContext';

const TimelineItem = ({ 
  data 
}: { 
  data: { 
    duration: string; 
    title: string; 
    subtitle: string; 
    description: string | string[];
    certificate?: string;
  } 
}) => {
  const descriptionText = Array.isArray(data.description) 
    ? data.description.join(' ') 
    : data.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-12 before:absolute before:left-[17px] before:top-0 before:h-full before:w-[2px] before:bg-primary/20"
    >
      <div className="absolute left-0 top-0 h-9 w-9 rounded-full border-2 border-primary/40 bg-background flex items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-primary"></div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary w-fit">
          {data.duration}
        </span>
        <h3 className="text-xl font-bold mt-2">{data.title}</h3>
        <h4 className="text-sm font-semibold text-muted-foreground">{data.subtitle}</h4>
        <p className="mt-2 text-muted-foreground">{descriptionText}</p>

        {data.certificate && (
          <div className="mt-4 flex">
            <Button asChild size="sm" variant="outline" className="gap-2">
              <a href={`/${data.certificate}`} target="_blank" rel="noopener noreferrer">
                <Award className="h-4 w-4" />
                View Certificate
              </a>
            </Button>
          </div>
        )}

      </div>
    </motion.div>
  );
};


export default function Resume() {

  const { activeResumeTab, setActiveResumeTab } = useTabContext();

  return (
    <section id="resume" className="py-20 md:py-32 scroll-mt-20">
      <div className="container px-4 md:px-6">
        <SectionTitle 
          title="My Resume" 
          subtitle="An overview of my professional journey and academic qualifications" 
        />
        <Tabs 
          value={activeResumeTab} 
          onValueChange={setActiveResumeTab} 
          className="mt-12 w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 h-14 rounded-full">
            <TabsTrigger value="experience" className="text-base sm:text-lg rounded-full">
              <Briefcase className="mr-2 h-5 w-5" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="text-base sm:text-lg rounded-full">
              <GraduationCap className="mr-2 h-5 w-5" />
              Education
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="experience" className="mt-12">
            <div className="flex flex-col gap-12">
              {experienceData.map((item) => (
                <TimelineItem 
                  key={item.id} 
                  data={{
                    duration: item.period,
                    title: item.title,
                    subtitle: item.company,
                    description: item.description,
                  }} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="education" className="mt-12">
            <div className="flex flex-col gap-12">
              {educationData.map((item: Education) => (
                <TimelineItem 
                  key={item.id} 
                  data={{
                    duration: item.duration,
                    title: item.degree,
                    subtitle: item.institution,
                    description: item.description,
                    certificate: item.certificate,
                  }} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}