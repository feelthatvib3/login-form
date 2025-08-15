import { API_URL } from 'shared/constants/app';
import type { User } from 'shared/types/user';

export interface RegisterParams {
  email: string;
  password: string;
}

interface RegisterResponse {
  user: User;
}

export async function register({ email, password }: RegisterParams): Promise<RegisterResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.error || `Unable to sign up. Server responded with status ${res.status}.`
    );
  }

  return res.json();
}
