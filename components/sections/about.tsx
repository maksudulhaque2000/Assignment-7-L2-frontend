'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from '@/lib/motion-wrapper';
import { useInView } from 'react-intersection-observer';
import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import profile from '@/public/profile.png';

const resumeFileName = 'Resume v.pdf';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <SectionTitle 
          title="About Me" 
          subtitle="Get to know more about my journey and what drives me as a developer"
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square max-w-md mx-auto md:mx-0 overflow-hidden rounded-2xl"
          >
            <Image
              src={profile}
              alt="Developer Maksudul Haque"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Full Stack Developer with a passion for creating impactful digital experiences</h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                With over 2 years of experience in web development, I specialize in building modern, 
                responsive applications using cutting-edge technologies like React, Next.js, Node.js, 
                and TypeScript.
              </p>
              
              <p>
                My approach combines technical expertise with a keen eye for design and user experience. 
                I believe in writing clean, maintainable code that solves real problems for users.
              </p>
              
              <p>
                Beyond coding, I&apos;m passionate about continuous learning, sharing knowledge with the 
                developer community, and exploring new technologies that can enhance the digital landscape.
              </p>
            </div>

            <div className="pt-4">
               <a
                href={`/${resumeFileName}`}
              >
                <Button className="rounded-full" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}