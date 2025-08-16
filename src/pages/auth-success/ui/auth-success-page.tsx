import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function AuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token && token.split('.').length === 3) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, '', '/');
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <main>
      <div className="flex min-h-dvh flex-col items-center justify-center gap-y-2 px-10">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGo3d2Fna3h6cmFrd3B5d2Yzc3Rldm9wNWoyZWY3a3IwcXM2ODMwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lJNoBCvQYp7nq/giphy.gif"
          alt="sad cat"
          className="block size-full max-h-[500px] max-w-[500px]"
        />
        <p className="text-center">Redirecting you, give it a moment.</p>
      </div>
    </main>
  );
}
