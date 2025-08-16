import { API_URL } from 'shared/constants/app';

export interface RegisterParams {
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  token: string;
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
