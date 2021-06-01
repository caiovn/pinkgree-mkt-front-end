import { AppProps } from 'next/app';
import { BottomNavbar, TopNavbar } from '@/layouts/index';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <TopNavbar />
      <div className="content">
        <Component {...pageProps} />
      </div>
      <BottomNavbar />
    </main>
  );
}

export default MyApp;
