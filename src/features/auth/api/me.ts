import { API_URL } from 'shared/constants/app';
import type { User } from 'shared/types/user';

interface MeResponse {
  user: User;
}

export async function me(): Promise<MeResponse> {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include'
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(
      errorData?.error || `Unable to fetch user. Server responded with status ${res.status}.`
    );
  }

  return res.json();
}
