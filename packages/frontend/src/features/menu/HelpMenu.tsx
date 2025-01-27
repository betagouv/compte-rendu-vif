import { Divider, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { MenuTitle } from "./MenuTitle";
import { clearDb } from "../../db/db";
import { css } from "#styled-system/css";
import { menuActor } from "./menuMachine";

export const HelpMenu = () => {
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
      <MenuTitle backButtonOnClick={() => menuActor.send({ type: "BACK" })}>Assistance technique</MenuTitle>
      <Divider height="2px" my={{ base: "27px", lg: "0" }} mb={{ base: 0, lg: "27px" }} color="#C1C1FB" />
      <Stack>
        <styled.div px="20px" fontWeight="bold">
          Vous pouvez contacter l'équipe à contact@compte-rendu-vif.beta.gouv.fr.
        </styled.div>
        <Divider height="2px" mt="18px" mb="16px" color="#C1C1FB" />
        <styled.div mb="10px" px="20px">
          Vous ne voyez pas vos dernières informations enregistrées ? Essayez de réinitialiser les données locales :
        </styled.div>
        <Button className={css({ ml: "20px" })} onClick={() => deleteLocalData()}>
          Réinitialiser
        </Button>
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
