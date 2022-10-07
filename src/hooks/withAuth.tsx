import Loading from '@/components/Loading'
import { useKeycloak } from '@react-keycloak/ssr'
import type { KeycloakInstance } from 'keycloak-js'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const withAuth =
  <PageProps extends Record<string, unknown>>(
    Page: NextPage<PageProps>
  ): NextPage<PageProps> =>
  ({ ...props }) => {
    const { keycloak, initialized } = useKeycloak<KeycloakInstance>()
    const [isAuthenticated, setAuthenticaded] = useState(false)
    const [isInitialized, setInitialized] = useState<boolean>(false)

    useEffect(() => {
      if (initialized && !keycloak?.authenticated) {
        keycloak?.login()
      }

      setAuthenticaded(keycloak?.authenticated)
      setInitialized(initialized)
    }, [initialized, keycloak?.authenticated])

    return (
      <>
        {isInitialized && isAuthenticated ? (
          <Page {...(props as PageProps)} />
        ) : (
          <div className="loading-container">
            <Loading />
          </div>
        )}
      </>
    )
  }

export default withAuth
