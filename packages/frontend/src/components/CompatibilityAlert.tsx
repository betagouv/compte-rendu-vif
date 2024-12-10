import { Center } from "#styled-system/jsx";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Bowser from "bowser";

const browser = Bowser.getParser(window.navigator.userAgent);
const isWrongVersion = browser.getBrowser().name === "Firefox" && browser.getBrowserVersion().startsWith("102");

export const CompatibilityAlert = () => {
  if (!isWrongVersion) return null;
  return (
    <Center>
      <Alert
        severity="warning"
        title={`
        Votre navigateur n'est pas compatible avec l'application. 
        Veuillez le mettre à jour, ou utiliser un autre navigateur.
        `}
      />
    </Center>
  );
};
