import * as Icons from 'lucide-react';

export const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as any)[name];
  if (!LucideIcon) return <Icons.HelpCircle className={className} />;
  return <LucideIcon className={className} />;
};