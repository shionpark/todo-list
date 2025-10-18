/**
 * @file 접근성을 고려한 재사용 가능한 체크박스 컴포넌트
 */
'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@lib/utils'; // cn 유틸리티 필요

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    // 임시 cn 함수
    const inputId = id || `checkbox-${label}`;

    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={inputId}
          ref={ref}
          className={cn(
            'peer border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary h-5 w-5 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-slate-100',
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
