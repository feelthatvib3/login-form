import type { ZodString } from 'zod';

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
  zodValidation: (schema: ZodString) => ZodString;
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (pw) => pw.length >= 8,
    zodValidation: (schema) => schema.min(8, 'Password must be at least 8 characters')
  },
  {
    id: 'lowercase',
    label: 'At least one lowercase letter',
    test: (pw) => /[a-z]/.test(pw),
    zodValidation: (schema) =>
      schema.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  },
  {
    id: 'uppercase',
    label: 'At least one uppercase letter',
    test: (pw) => /[A-Z]/.test(pw),
    zodValidation: (schema) =>
      schema.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  },
  {
    id: 'number',
    label: 'At least one number',
    test: (pw) => /[0-9]/.test(pw),
    zodValidation: (schema) => schema.regex(/[0-9]/, 'Password must contain at least one number')
  },
  {
    id: 'special',
    label: 'At least one special character',
    test: (pw) => /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/;]/.test(pw),
    zodValidation: (schema) =>
      schema.regex(
        /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/;]/,
        'Password must contain at least one special character'
      )
  }
];
