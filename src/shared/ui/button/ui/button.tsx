import { SpinnerIcon } from '@phosphor-icons/react';
import { type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { cn } from 'shared/lib/cn';
import { buttonVariants } from 'shared/ui/button';

type ButtonProps<T extends ElementType = 'button'> = {
  as?: T;
  loading?: boolean;
} & ComponentPropsWithoutRef<T> &
  VariantProps<typeof buttonVariants>;

export function Button<T extends ElementType = 'button'>({
  as,
  className,
  variant,
  size,
  loading,
  children,
  ...props
}: ButtonProps<T>) {
  const Comp = as || 'button';

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={loading}
      {...props}
    >
      {loading && <SpinnerIcon className="size-5 animate-spin" />}
      {children}
    </Comp>
  );
}
