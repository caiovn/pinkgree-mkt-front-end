import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js"
import { NextPage } from "next";
import { useEffect } from "react";

const withAuth = <PageProps extends Record<string, unknown>>(Page: NextPage<PageProps>): NextPage<PageProps> => ({ ...props }) => {

    const {keycloak, initialized} = useKeycloak<KeycloakInstance>();

    useEffect(() => {
        if (initialized && !keycloak?.authenticated) {
            keycloak?.login();
        }
    }, [initialized, keycloak?.authenticated])

    return(
        <>
            {initialized && keycloak?.authenticated ? (<Page {...(props as PageProps)}/>) : <span>carregando PORRA</span>}
        </>
    );
}

export default withAuth;
