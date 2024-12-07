import { Divider, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { MenuTitle } from "./MenuTitle";
import { clearDb } from "../../db/db";

export const HelpMenu = ({ backButtonOnClick }: { backButtonOnClick: () => void }) => {
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
      <MenuTitle backButtonOnClick={backButtonOnClick}>Assistance technique</MenuTitle>
      <Divider height="2px" my={{ base: "27px", lg: "44px" }} color="#C1C1FB" />
      <Stack px="20px">
        <styled.div mb="10px">
          Vous ne voyez pas vos dernières informations enregistrées ? Essayez de réinitialiser les données locales :
        </styled.div>
        <Button onClick={() => deleteLocalData()}>Réinitialiser</Button>
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
