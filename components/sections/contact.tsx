'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/ui/section-title';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

function CustomContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message.');
      }
      
      setStatus({ submitting: false, success: true, error: '' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ submitting: false, success: false, error: 'Something went wrong. Please try again.' });
    }
  };

  if (status.success) {
    return (
      <div className="text-center p-8 bg-secondary rounded-lg">
        <h3 className="text-xl font-bold">Message sent successfully!</h3>
        <p className="text-muted-foreground mt-2">Thank you for reaching out.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" required />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
        <Input id="subject" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message" rows={5} required />
      </div>
      {status.error && <p className="text-red-500 text-sm">{status.error}</p>}
      <Button type="submit" disabled={status.submitting} className="w-full">
        {status.submitting ? 'Sending...' : 'Send Message'}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}

export default function Contact() {
    return (
        <section id="contact" className="py-20 md:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <SectionTitle 
              title="Get In Touch"
              subtitle="Have a question or want to work together? Drop me a message!"
            />
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Contact Information</h3>
                <p className="text-muted-foreground">
                  Feel free to reach out using the contact form or through any of the channels below.
                </p>
              </div>
              <div>
                <CustomContactForm />
              </div>
            </div>
          </div>
        </section>
    );
}