import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';
import { useId, useState } from 'react';
import type { ComponentProps } from 'react';

import { cn } from 'shared/lib/cn';

export function Input({ className, type, ...props }: ComponentProps<'input'>) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const togglePasswordVisibilityButtonId = useId();

  return (
    <div className="relative w-full">
      <input
        type={isPassword && show ? 'text' : type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input border-ring/25 rounded-radius flex w-full min-w-0 border bg-white px-4 py-3 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          isPassword && 'pr-10',
          className
        )}
        {...props}
      />
      {isPassword && (
        <>
          <label htmlFor={togglePasswordVisibilityButtonId} className="sr-only">
            {show ? 'Hide password' : 'Show password'}
          </label>
          <button
            id={togglePasswordVisibilityButtonId}
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-4 flex cursor-pointer items-center"
            tabIndex={-1}
          >
            {show ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
          </button>
        </>
      )}
    </div>
  );
}
