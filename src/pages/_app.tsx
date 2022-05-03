import { BottomNavbar, TopNavbar } from '@/layouts/index'
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr'
import cookie from 'cookie'
import type { IncomingMessage } from 'http'
import { AppContext, AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'


const keycloakCfg = {
  url: 'http://localhost:8080/auth/',
  realm: 'Pinkgreen-mkt',
  clientId: 'pinkgreen-frontend',
}

const initOptions = {
  onLoad: 'check-sso',
}

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  )
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
    cookies: parseCookies(context?.ctx?.req),
  }
}

export default MyApp
