import { Divider, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { electric } from "../../db";
import { MenuTitle } from "./MenuTitle";

export const HelpMenu = ({ backButtonOnClick }: { backButtonOnClick: () => void }) => {
  const deleteLocalData = () => {
    if (electric.isConnected) electric.disconnect();
    localStorage.clear();
    indexedDB.deleteDatabase("crvif.db");
    window.location.reload();
  };
  return (
    <>
      <MenuTitle backButtonOnClick={backButtonOnClick}>Assistance technique</MenuTitle>
      <Divider height="2px" my={{ base: "27px", lg: "44px" }} color="#C1C1FB" />
      <Stack>
        <styled.div mb="10px">
          Vous ne voyez pas vos dernières informations enregistrées ? Essayez de réinitialiser les données locales :
        </styled.div>
        <Button onClick={() => deleteLocalData()}>Réinitialiser</Button>
      </Stack>
    </>
  );
};
