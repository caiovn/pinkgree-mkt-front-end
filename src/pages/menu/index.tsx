import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import style from './menu.module.scss'

export default function Menu() {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  
  const [name, setName] = useState('user')
  const [authenticated, setAuthenticaded] = useState<boolean>()

  useEffect(() => {
    if (keycloak.authenticated) {
      setName(keycloak.tokenParsed.given_name)
      setAuthenticaded(!!keycloak.authenticated)
    }
  }, [keycloak?.authenticated])

  const login = () => {
    if (keycloak) {
      window.location.href = keycloak.createLoginUrl()
    }
  }

  return (
    <>
      <Head>
        <title>Menu.</title>
      </Head>
      <div className={style.menuPage}>
        {!authenticated ? (
          <div className={style.menuLoggedHeader} onClick={login}>
            <p>Entre ou cadastre-se</p>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        ) : (
          <div className={style.menuUnloggedHeader}>
            <i className="fa-solid fa-user"></i>
            <p>Olá, {name}!</p>
          </div>
        )}
      </div>
    </>
  )
}
