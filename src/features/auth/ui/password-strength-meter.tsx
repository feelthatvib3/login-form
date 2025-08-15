import { CheckIcon, XIcon } from '@phosphor-icons/react';
import { type HTMLAttributes, forwardRef } from 'react';

import { passwordRequirements } from 'features/auth/lib/password-requirements';

import { cn } from 'shared/lib/cn';

export interface PasswordStrengthMeterProps extends HTMLAttributes<HTMLDivElement> {
  password: string;
}

const PasswordStrengthMeter = forwardRef<HTMLDivElement, PasswordStrengthMeterProps>(
  ({ password = '', className }, ref) => {
    return (
      <div ref={ref} className={cn('bg-background rounded-radius border p-2', className)}>
        <ul>
          {passwordRequirements.map(({ id, label, test }) => {
            const passed = test(password);
            return (
              <li
                key={id}
                className={cn(
                  'flex items-center gap-x-1 text-xs',
                  passed ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {passed ? <CheckIcon /> : <XIcon />} {label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);
PasswordStrengthMeter.displayName = 'PasswordStrengthMeter';

export { PasswordStrengthMeter };
