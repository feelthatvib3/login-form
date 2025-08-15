import { LoginForm } from 'features/auth';

export function LoginPage() {
  return (
    <main>
      <div className="flex min-h-dvh items-center justify-center">
        <div className="flex w-full flex-col items-center space-y-6 px-4">
          <h1 className="text-3xl font-medium tracking-tight">Log in to Acme</h1>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
