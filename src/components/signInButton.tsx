'use client';
import { signIn } from 'next-auth/react';

export default function SignInButton() {
  return (
    <button
      onClick={() => {
        void signIn();
      }}
    >
      Sign in
    </button>
  );
}
