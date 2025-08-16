import { zodResolver } from '@hookform/resolvers/zod';
import { SignInIcon } from '@phosphor-icons/react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { GithubOAuthButton, register as registerUser } from 'features/auth';
import { passwordRequirements } from 'features/auth/lib/password-requirements';

import { cn } from 'shared/lib/cn';
import { Alert, AlertDescription } from 'shared/ui/alert/ui/alert';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

import { PasswordStrengthMeter } from './password-strength-meter';

const passwordSchema = passwordRequirements.reduce(
  (schema, requirement) => requirement.zodValidation(schema),
  z.string()
);

const registerSchema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    password: passwordSchema,
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  });

  const onSubmit = (values: RegisterFormInputs) => {
    mutate(values);
  };

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xs space-y-4">
      {error && (
        <Alert variant="destructive" role="alert-error">
          <AlertDescription>
            {error instanceof Error ? error.message : 'Something went wrong. Please try again.'}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <Input
            id="email"
            {...register('email')}
            placeholder="Email"
            autoComplete="email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(errors.email && 'border-destructive')}
          />
          {errors.email && <p className="text-destructive mt-1 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Input
            id="password"
            {...register('password')}
            placeholder="Password"
            autoComplete="new-password"
            type="password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            className={cn(errors.password && 'border-destructive')}
          />
          {errors.password && (
            <p className="text-destructive mt-1 text-sm">{errors.password.message}</p>
          )}
        </div>
        <PasswordStrengthMeter password={watch('password').trim()} />

        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            {...register('confirmPassword')}
            placeholder="Confirm password"
            autoComplete="new-password"
            type="password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
            className={cn(errors.confirmPassword && 'border-destructive')}
          />
          {errors.confirmPassword && (
            <p className="text-destructive mt-1 text-sm">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isPending}
          aria-busy={isPending}
          icon={<SignInIcon weight="bold" />}
        >
          Sign Up
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="w-full"
          onClick={handleRedirectToLogin}
        >
          Log In Instead
        </Button>
      </div>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>

      <GithubOAuthButton />
    </form>
  );
}
