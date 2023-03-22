import { AppProps } from 'next/app';
import Navbar from '../components/navigation/Navbar';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
