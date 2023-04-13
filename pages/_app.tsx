import { AppProps } from 'next/app';
import '../styles/globals.css';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <div className="overflow-y-scroll max-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
