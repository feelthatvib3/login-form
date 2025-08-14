import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from 'features/auth';

import { cn } from 'shared/lib/cn';
import { Alert, AlertDescription } from 'shared/ui/alert/ui/alert';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

const loginSchema = z.object({
  email: z.email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  });

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      reset();
    }
  });

  const onSubmit = (values: LoginFormInputs) => {
    mutate(values);
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

      {data && (
        <Alert variant="success" role="alert-success">
          <AlertDescription>Successfully logged in as {data.user.name}.</AlertDescription>
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
            autoComplete="current-password"
            type="password"
            className={cn(errors.password && 'border-destructive')}
          />
          {errors.password && (
            <p className="text-destructive mt-1 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full" loading={isPending} aria-busy={isPending}>
        Login
      </Button>
    </form>
  );
}
