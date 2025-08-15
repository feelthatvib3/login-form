import { SpinnerIcon } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ME_QUERY_KEY, me } from 'features/auth';

export function ProtectedRoute({ children }: Readonly<{ children: ReactNode }>) {
  const { data, isLoading, isError } = useQuery({
    queryKey: [ME_QUERY_KEY],
    queryFn: me
  });

  if (isLoading) {
    return (
      <main>
        <div className="flex min-h-dvh flex-col items-center justify-center gap-y-4">
          <p className="text-2xl font-medium">Redirecting</p>
          <SpinnerIcon className="size-6 animate-spin" />
        </div>
      </main>
    );
  }

  if (isError || !data?.user) return <Navigate to="/login" replace />;

  return children;
}
