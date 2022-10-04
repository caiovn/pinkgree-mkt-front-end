import Button from '@/components/Button'
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

  const logout = () => {
    if (keycloak) {
      window.location.href = keycloak.createLogoutUrl()
    }
  }

  return (
    <>
      <Head>
        <title>Menu.</title>
      </Head>
      <div className={style.menuPage}>
        {!authenticated ? (
          <div className={style.menuLoggedPageHeader} onClick={login}>
            <p>Entre ou cadastre-se</p>
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        ) : (
          <div className={style.menuUnloggedPageHeader}>
            <i className="fa-solid fa-user"></i>
            <p>Olá, {name}!</p>
          </div>
        )}
        <div className={style.menuPageBody}>
          <div className={style.menuPageBodyItem}>
            <i className="fa-solid fa-box"></i>
            <p>Meus pedidos</p>
          </div>
        </div>
        <div className={style.menuPageOptions}>
          {authenticated && <Button type="button" onClick={logout}>Logout</Button>}
        </div>
      </div>
    </>
  )
}
