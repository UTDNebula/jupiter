'use client';
import { AccountIcon } from '@src/icons/Icons';
import { signIn } from 'next-auth/react';

export default function SignInButton() {
  return (
    <button
      onClick={() => {
        void signIn();
      }}
      className="rounded-full bg-white p-2.5 shadow-md"
    >
      <AccountIcon />
    </button>
  );
}
