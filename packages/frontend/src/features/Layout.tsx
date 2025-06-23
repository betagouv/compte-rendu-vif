import { CompatibilityAlert } from "#components/CompatibilityAlert.tsx";
import { ReportSearch } from "#components/ReportSearch.tsx";
import { css, cx } from "#styled-system/css";
import { Box, styled } from "#styled-system/jsx";
import { Flex } from "#styled-system/jsx";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import { Link, useRouter } from "@tanstack/react-router";
import { type PropsWithChildren, useRef } from "react";
import { useIsLoggedIn } from "../contexts/AuthContext";
import { MenuButton, MenuModal } from "../features/menu/MenuButton";
import { useIsDesktop } from "../hooks/useIsDesktop";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Flex pos="relative" flexDir={"column"} h="100vh">
      <AppHeader />
      <CompatibilityAlert />
      <Box flex="1">{children}</Box>
      {/* <TanStackRouterDevtools /> */}

      <AppFooter />
    </Flex>
  );
};

const AppFooter = () => {
  return (
    <footer id="fr-footer" className="fr-footer" role="contentinfo" style={{ border: "none", borderBottomWidth: 0 }}>
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand fr-enlarge-link">
            <a className="active" title="Compte rendu vif" href="/" data-status="active">
              <p className="fr-logo">
                Ministère
                <br /> de la culture
              </p>
            </a>
          </div>
          <div className="fr-footer__content">
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://legifrance.gouv.fr"
                  title="legifrance.gouv.fr - ouvre une nouvelle fenêtre"
                >
                  legifrance.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://gouvernement.fr"
                  title="gouvernement.fr - ouvre une nouvelle fenêtre"
                >
                  gouvernement.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://service-public.fr"
                  title="service-public.fr - ouvre une nouvelle fenêtre"
                >
                  service-public.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://data.gouv.fr"
                  title="data.gouv.fr - ouvre une nouvelle fenêtre"
                >
                  data.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <span className="fr-footer__bottom-link">Accessibilité: partiellement conforme</span>
            </li>
          </ul>

          <Flex flexDir="column">
            <VersionDisplay />
            <div className="fr-footer__bottom-copy">
              <p>
                Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont
                proposés sous{" "}
                <a
                  href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                  target="_blank"
                  title="licence etalab-2.0 - ouvre une nouvelle fenêtre"
                >
                  licence etalab-2.0
                </a>
              </p>
            </div>
          </Flex>
        </div>
      </div>
    </footer>
  );
};

const VersionDisplay = () => {
  const version = window.APP_VERSION;

  if (!version) return null;
  return (
    <div className="fr-footer__bottom-copy">
      <styled.p mb="10px">Version {version}</styled.p>
    </div>
  );
};

const AppHeader = () => {
  const isDesktop = useIsDesktop();
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      <header
        role="banner"
        id="fr-header"
        className="fr-header [&amp;_.fr-btn--menu]:opacity_0 [&amp;_.fr-btn--menu]:pointer-events_none"
      >
        <div className="fr-header__body">
          <div
            className={cx(
              "fr-container",
              css({
                marginLeft: { base: "0", lg: "auto" },
                marginRight: { base: "0", lg: "auto" },
                paddingX: { base: "0", lg: "1rem" },
              }),
            )}
          >
            <div
              className={cx("fr-header__body-row", css({ justifyContent: "space-between", w: "100%", margin: "0" }))}
            >
              <Link className={css({ textWrap: "nowrap" })} to="/" title="Compte rendu vif">
                <styled.div
                  className="fr-header__brand"
                  bgColor={{ base: "transparent", lg: "unset" }}
                  _hover={{
                    bgColor: { base: "transparent", lg: "background-raised-grey-hover" },
                  }}
                >
                  <div className="fr-header__brand-top">
                    <div className="fr-header__logo">
                      <p className="fr-logo" style={{ position: "relative" }}>
                        Ministère
                        <br /> de la culture
                      </p>
                    </div>
                  </div>
                  {isDesktop ? (
                    <div className="fr-header__service lg:d_unset">
                      <p className="fr-header__service-title">
                        <>
                          Compte-rendu VIF{" "}
                          <Badge as="span" noIcon severity="success">
                            Beta
                          </Badge>
                        </>
                      </p>
                    </div>
                  ) : undefined}
                </styled.div>
              </Link>
              <div
                className={css({
                  display: "flex",
                  alignItems: "center",
                })}
              >
                {isLoggedIn ? <MenuButton /> : null}
              </div>
            </div>
          </div>
        </div>
      </header>
      <MenuModal />
    </>
  );
};
