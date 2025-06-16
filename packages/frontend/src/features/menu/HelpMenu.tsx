import { Divider, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { MenuTitle } from "./MenuTitle";
import { clearDb } from "../../db/db";
import { menuActor } from "./menuMachine";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { useState } from "react";

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
      <Divider
        height="2px"
        mt={{ base: "0", lg: "0" }}
        mb={{ base: "24px", lg: "32px" }}
        px={{ base: "16px", lg: 0 }}
        color="#C1C1FB"
      />
      <Stack>
        <Stack px="16px">
          <styled.h3 fontSize="20px">Foire aux questions</styled.h3>
          <styled.div>
            À qui s’adresse compte rendu VIF ? Comment créer un nouveau compte-rendu ? Comment ajouter des photos...
            Découvrez toutes les réponses sur la FAQ.
          </styled.div>
          <Button linkProps={{ href: "https://compte-rendu-vif.beta.gouv.fr/faq" }}>Consulter FAQ</Button>
        </Stack>

        <Divider height="2px" mt={{ base: "27px", lg: "32px" }} mb={{ base: 0, lg: "24px" }} color="#C1C1FB" />

        <Stack px="16px">
          <styled.h3 fontSize="20px">Assistance technique</styled.h3>
          <styled.div>
            Vous ne voyez pas vos dernières informations enregistrées ? Essayez de réinitialiser les données locales.
          </styled.div>
          <Button onClick={() => deleteLocalData()}>Réinitialiser</Button>
        </Stack>

        <Divider height="2px" mt={{ base: "27px", lg: "32px" }} mb={{ base: 0, lg: "24px" }} color="#C1C1FB" />

        <Stack mb="32px" px="16px">
          <styled.h3 fontSize="20px">Contact</styled.h3>

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
