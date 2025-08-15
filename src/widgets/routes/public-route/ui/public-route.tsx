import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ME_QUERY_KEY, me } from 'features/auth';

export function PublicRoute({ children }: Readonly<{ children: ReactNode }>) {
  const { data, isLoading } = useQuery({
    queryKey: [ME_QUERY_KEY],
    queryFn: me
  });

  if (isLoading) return <div>Loading...</div>;
  if (data?.user) return <Navigate to="/" replace />;

  return children;
}
