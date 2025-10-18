'use client';

import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  type = 'button',
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(
    'border-text flex w-40 items-center justify-center rounded-2xl border border-r-4 border-b-4 p-2.5 hover:cursor-pointer',
    className || 'bg-slate-200'
  );

  return (
    <button type={type} className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
