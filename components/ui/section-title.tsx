import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({ 
  title, 
  subtitle, 
  className 
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-2 text-center mb-12", className)}>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-[700px] mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}