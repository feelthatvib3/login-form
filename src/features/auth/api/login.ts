import { API_URL } from 'shared/constants/app';

export interface LoginParams {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
}

export async function login({ email, password }: LoginParams): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.error || `Unable to log in. Server responded with status ${res.status}.`
    );
  }

  return res.json();
}
