import type { User } from 'shared/types/user';

export interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.message || `Unable to log in. Server responded with status ${res.status}.`
    );
  }

  return res.json();
}
