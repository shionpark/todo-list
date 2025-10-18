'use client';

import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark';
  icon: React.ReactNode;
}

export default function IconButton({
  variant = 'light',
  icon,
  className,
  ...props
}: IconButtonProps) {
  const baseStyle =
    'inline-flex items-center justify-center rounded-full border-2 transition-colors duration-150 p-2.5 [&>svg]:size-5 border-text';

  const variants = {
    light: 'bg-slate-200 text-slate-500 ',
    dark: 'bg-slate-800 text-slate-100',
  };

  return (
    <button
      type="button"
      className={cn(baseStyle, variants[variant], className)}
      {...props}
    >
      {icon}
    </button>
  );
}
