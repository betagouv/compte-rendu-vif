import Alert from "@codegouvfr/react-dsfr/Alert";
import { useState } from "react";
import { auth } from "../features/keycloak/auth";
import { Button } from "./MUIDsfr";
import { Flex } from "./ui/Flex";

export const LoginForm = () => {
  const [shouldShowPopup] = useState(localStorage.getItem("crvif/update-popup"));

  return (
    <Flex flexDirection="column">
      <Button onClick={() => auth.login()}>Se connecter avec Keycloak</Button>

      {shouldShowPopup ? (
        <Alert
          style={{ marginBottom: "1.5rem" }}
          severity="info"
          title="Vous avez été déconnecté suite à une mise à jour de l'application."
        />
      ) : null}
    </Flex>
  );
};
