import { Divider, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { electric } from "../../db";

export const HelpMenu = () => {
  const deleteLocalData = () => {
    if (electric.isConnected) electric.disconnect();
    localStorage.clear();
    indexedDB.deleteDatabase("crvif.db");
    window.location.reload();
  };
  return (
    <>
      <Divider height="2px" my={{ base: "27px", lg: "44px" }} color="#C1C1FB" />
      <Stack>
        <styled.div mb="10px">
          Si vous n'arrivez pas à vous connecter, essayez de réinitialiser les données locales :
        </styled.div>
        <Button onClick={() => deleteLocalData()}>Réinitialiser</Button>
      </Stack>
    </>
  );
};