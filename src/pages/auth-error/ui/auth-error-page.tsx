export function AuthErrorPage() {
  return (
    <main>
      <div className="flex min-h-dvh flex-col items-center justify-center gap-y-2 px-10">
        <img
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGo3d2Fna3h6cmFrd3B5d2Yzc3Rldm9wNWoyZWY3a3IwcXM2ODMwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lJNoBCvQYp7nq/giphy.gif"
          alt="sad cat"
          className="block size-full max-h-[500px] max-w-[500px]"
        />
        <p className="text-center">
          He gave it his all with GitHub Auth, yet{' '}
          <a href="/" className="underline underline-offset-4">
            here
          </a>{' '}
          you are anyway.
        </p>
      </div>
    </main>
  );
}
