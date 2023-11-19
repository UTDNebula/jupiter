'use client';
import { signIn, type ClientSafeProvider } from 'next-auth/react';
import { type FC } from 'react';
import AuthIcons from '@src/icons/AuthIcons';

type Provider = ClientSafeProvider;

const colors: Record<string, string> = {
  Google: 'text-red-500',
  Discord: 'text-blue-700',
};

const ProviderButton: FC<{ provider: Provider }> = ({ provider }) => (
  <button
    type="button"
    onClick={() => {
      void signIn(provider.id);
    }}
    className="box-content flex flex-row items-center space-x-4 rounded-3xl bg-white py-2.5 pl-5 pr-6 shadow-sm shadow-slate-700"
  >
    <div>{AuthIcons[provider.id]}</div>
    <h2 className={`text-xs font-extrabold ${colors[provider.name]}`}>
      {provider.name}
    </h2>
  </button>
);

export default ProviderButton;
