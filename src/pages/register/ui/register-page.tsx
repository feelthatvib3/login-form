import { RegisterForm } from 'features/auth';

export function RegisterPage() {
  return (
    <main>
      <div className="flex min-h-dvh items-center justify-center">
        <div className="flex w-full flex-col items-center space-y-6 px-4">
          <h1 className="text-3xl font-medium tracking-tight">Sign up to Acme</h1>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
