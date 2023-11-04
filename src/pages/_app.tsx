import Head from 'next/head';
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '@src/utils/api';
import '@src/styles/globals.css';
import Sidebar from '@src/components/Sidebar';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Jupiter</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/logoIcon.svg" type="image/svg+xml" />
      </Head>
      <SessionProvider {...session}>
        <Sidebar />
        <div className="max-h-screen overflow-y-scroll">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
