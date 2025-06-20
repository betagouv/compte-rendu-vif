import { Divider, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { MenuTitle } from "./MenuTitle";
import { clearDb } from "../../db/db";
import { menuActor } from "./menuMachine";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { useState } from "react";
import { TitleH3 } from "../../routes/account";

export const HelpMenu = () => {
  const [showClipboardSuccess, setShowClipboardSuccess] = useState(false);

  const deleteLocalData = () => {
    localStorage.clear();
    indexedDB.deleteDatabase("crvif.db");
    unregisterSWs();
    clearDb().then(() => {
      window.location.reload();
    });
  };
  return (
    <>
      <MenuTitle backButtonOnClick={() => menuActor.send({ type: "BACK" })}>Aide</MenuTitle>
      <styled.div px="16px">
        <Divider
          height="2px"
          mt={{ base: "0", lg: "0" }}
          mb={{ base: "24px", lg: "32px" }}
          px={{ base: "16px", lg: 0 }}
          color="#C1C1FB"
        />
      </styled.div>
      <Stack>
        <Stack px="16px">
          <TitleH3>Foire aux questions</TitleH3>
          <styled.div mt="8px">
            À qui s’adresse compte rendu VIF ? Comment créer un nouveau compte-rendu ? Comment ajouter des photos...
            Découvrez toutes les réponses sur la FAQ.
          </styled.div>
          <Button linkProps={{ href: "https://compte-rendu-vif.beta.gouv.fr/faq" }}>Consulter FAQ</Button>
        </Stack>
        <styled.div px="16px">
          <Divider height="2px" mt={{ base: "27px", lg: "32px" }} mb={{ base: 0, lg: "24px" }} color="#C1C1FB" />
        </styled.div>
        <Stack mt="8px" px="16px">
          <TitleH3>Assistance technique</TitleH3>
          <styled.div>
            Vous ne voyez pas vos dernières informations enregistrées ? Essayez de réinitialiser les données locales.
          </styled.div>
          <Button onClick={() => deleteLocalData()}>Réinitialiser</Button>
        </Stack>

        <styled.div px="16px">
          <Divider height="2px" mt={{ base: "27px", lg: "32px" }} mb={{ base: 0, lg: "24px" }} color="#C1C1FB" />
        </styled.div>

        <Stack mt="8px" mb="32px" px="16px">
          <TitleH3>Contact</TitleH3>

          {showClipboardSuccess ? (
            // @ts-ignore
            <Alert severity="info" title={undefined} description="Ajouté au presse-papier" />
          ) : null}
          <styled.div>
            Vous pouvez contacter l'équipe à{" "}
            <styled.span
              onClick={() => {
                navigator.clipboard.writeText("contact@compte-rendu-vif.beta.gouv.fr");
                setShowClipboardSuccess(true);
              }}
              color="text-active-blue-france"
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
            >
              contact@compte-rendu-vif.beta.gouv.fr
            </styled.span>
            .
          </styled.div>
        </Stack>
      </Stack>
    </>
  );
};

const unregisterSWs = async () => {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();

    // Unregister all service workers
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }
};
