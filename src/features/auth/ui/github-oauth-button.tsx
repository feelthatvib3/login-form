import { GithubLogoIcon } from '@phosphor-icons/react';

import { API_URL } from 'shared/constants/app';
import { Button } from 'shared/ui/button';

export function GithubOAuthButton() {
  const handleGithubAuth = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  return (
    <Button
      type="button"
      size="lg"
      variant="outline"
      className="w-full"
      icon={<GithubLogoIcon weight="bold" />}
      onClick={handleGithubAuth}
    >
      GitHub
    </Button>
  );
}
