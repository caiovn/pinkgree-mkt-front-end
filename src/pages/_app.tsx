import { AppProps, AppContext } from 'next/app';
import cookie from 'cookie';
import type { IncomingMessage } from 'http';
import { BottomNavbar, TopNavbar } from '@/layouts/index';
import '../styles/globals.css';

import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr';

const keycloakCfg = {
  url: 'http://localhost:8080/auth/',
  realm: 'Pinkgreen-mkt',
  clientId: 'pinkgreen-frontend'
}

const initOptions = {
  onLoad: 'check-sso'
}

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return (
    <>
      <SSRKeycloakProvider 
        keycloakConfig={keycloakCfg} 
        persistor={SSRCookies(cookies)}
        initOptions={initOptions}
      >
        <main>
          <TopNavbar />
          <div className="content">
            <Component {...pageProps} />
          </div>
          <BottomNavbar />
        </main>
      </SSRKeycloakProvider>
    </>
  );
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req)
  }
}

export default MyApp;
