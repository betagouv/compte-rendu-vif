import Badge from "@codegouvfr/react-dsfr/Badge";
import Footer from "@codegouvfr/react-dsfr/Footer";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRouteWithContext, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { PropsWithChildren } from "react";
import { useIsLoggedIn, useLogout } from "../contexts/AuthContext";
import { Box, Flex } from "#styled-system/jsx";
import type { RouterOutputs } from "../api";
import { css, cx } from "#styled-system/css";

export const Route = createRootRouteWithContext<Partial<RouterOutputs<"/api/login">>>()({
  beforeLoad: (ctx) => {
    document.title = getTitle(ctx.location.pathname);
  },
  component: () => (
    <>
      <MuiDsfrThemeProvider>
        <Layout>
          <Outlet />
        </Layout>
      </MuiDsfrThemeProvider>
    </>
  ),
});

const getTitle = (pathname: string) => {
  if (pathname.startsWith("/edit/")) {
    return "Compte rendu | CR VIF";
  }

  if (pathname.startsWith("/pdf")) {
    return "PDF | CR VIF";
  }

  if (pathname.startsWith("/login")) {
    return "Connexion | CR VIF";
  }

  if (pathname.startsWith("/signup")) {
    return "Inscription | CR VIF";
  }

  return "CR VIF";
};

const Layout = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();

  return (
    <Flex flexDir={"column"} h="100vh">
      <Header
        brandTop={
          <>
            Ministère
            <br /> de la culture
          </>
        }
        serviceTitle={
          <>
            Compte-rendu VIF{" "}
            <Badge as="span" noIcon severity="warning">
              WiP
            </Badge>
          </>
        }
        homeLinkProps={{ title: "Compte rendu vif", to: "/" }}
        quickAccessItems={[
          ...(isLoggedIn
            ? [
                {
                  iconId: "fr-icon-logout-box-r-line" as const,
                  text: "Se déconnecter",
                  buttonProps: { onClick: logout },
                },
              ]
            : [
                {
                  text: "Connexion",
                  iconId: "ri-account-circle-line" as const,
                  linkProps: { to: "/login" },
                },
                {
                  text: "Inscription",
                  iconId: "fr-icon-add-circle-line" as const,
                  linkProps: { to: "/signup" },
                },
              ]),
        ]}
        renderSearchInput={({ className, ...props }) => {
          console.log(props);

          return <input className={cx(css({ hideFrom: "lg" }), className)} {...props} />;
        }}
      />
      <Box flex="1">{children}</Box>
      {/* <TanStackRouterDevtools /> */}
      <Footer accessibility="partially compliant" />
    </Flex>
  );
};
