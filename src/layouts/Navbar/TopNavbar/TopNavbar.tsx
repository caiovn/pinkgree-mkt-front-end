import Button from '@/components/Button'
import Input from '@/components/Input'
import ROUTES from '@/routes/routes'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import BottomNavbar from '../BottomNavbar/BottomNavbar'
import { NAVBAR_ITEMS } from '../BottomNavbar/constants/navbarItems'
import styles from './TopNavbar.module.scss'

const TopNavbar = () => {
  const { keycloak } = useKeycloak<KeycloakInstance>()
  const [authenticated, setAuthenticaded] = useState<boolean>(false)
  const [name, setName] = useState('user')

  useEffect(() => {
    if (keycloak.authenticated) {
      console.log(keycloak.tokenParsed)
      setName(keycloak.tokenParsed.name)
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
    <div className={styles.container}>
      <Link href={ROUTES.HOME} className={styles.logo}>
        Pinkgreen.
      </Link>
      <div className={styles.desktopLinks}>
        <div className={styles.inputWrapper}>
          <Input placeholder="Pesquisar" width="480px" />
          <Button>
            <i className="fas fa-search"></i>
          </Button>
        </div>
      </div>
      <div className={styles.desktopLinks}>
        <div>
          <Button>
            <i className="fa-regular fa-heart" />
          </Button>
          {authenticated ? (
            <div className={styles.logoutContainer}>
              <Button onClick={logout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </Button>
            </div>
          ) : (
            <div>
              <Button bgColor="white" color="black" onClick={login}>
                <i className="fa-solid fa-user"></i>
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* <button className={styles.buttonWrapper}>
        <i className="fas fa-shopping-bag" aria-label="carrinho" />
      </button> */}
    </div>
  )
}

export default TopNavbar
