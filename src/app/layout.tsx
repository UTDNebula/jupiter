import '@src/styles/globals.css';

import { Inter } from 'next/font/google';
import { headers } from 'next/headers';

import { TRPCReactProvider } from '@src/trpc/react';
import Sidebar from '@src/components/Sidebar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider headers={headers()}>
          <Sidebar />
          <div className="max-h-screen overflow-y-scroll">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
