import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function PublicRoute({ children }: Readonly<{ children: ReactNode }>) {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
