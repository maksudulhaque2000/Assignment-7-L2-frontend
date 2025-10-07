import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Portfolio | Frontend & Full Stack Developer',
  description: 'Professional portfolio showcasing my projects, skills, and experience as a developer.',
};

export default async function Home() {
  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
    </div>
  );
}