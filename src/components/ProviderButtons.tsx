'use client';
import { signIn, type ClientSafeProvider } from 'next-auth/react';
import { type FC } from 'react';
import AuthIcons from '@src/icons/AuthIcons';

type Provider = ClientSafeProvider;

const ProviderButton: FC<{ provider: Provider }> = ({ provider }) => (
  <div>
    <button
      onClick={() => {
        void signIn(provider.id);
      }}
    >
      {AuthIcons[provider.id]}
    </button>
  </div>
);

export default ProviderButton;
