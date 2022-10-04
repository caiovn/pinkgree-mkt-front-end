import * as React from 'react'
import cookie from 'cookie'
import type { IncomingMessage } from 'http'
import { AppContext, AppProps } from 'next/app'
import { BottomNavbar, TopNavbar } from '@/layouts/index'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'

import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr'
import Loading from '@/components/Loading'

const keycloakCfg = {
  url: 'http://localhost:8080/',
  realm: 'pinkgreen-mkt',
  clientId: 'pinkgreen-mkt-frontend',
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
        LoadingComponent={
          <div className="loading-container">
            <Loading />
          </div>
        }
      >
        <React.Suspense
          fallback={
            <div className="loading-container">
              <Loading />
            </div>
          }
        >
          <main>
            <TopNavbar />
            <div className="content">
              <Component {...pageProps} />
            </div>
            <BottomNavbar />
          </main>
        </React.Suspense>
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
