import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "../styled-system/styles.css";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import Button from "@codegouvfr/react-dsfr/Button";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { css } from "#styled-system/css";
import { next as A } from "@automerge/automerge";
import { getOrCreateHandle, repo } from "./automerge";
import { Counter } from "./Counter";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";
function App() {
  const [count, setCount] = useState(0);

  return (
    <MuiDsfrThemeProvider>
      <Header
        brandTop={
          <>
            Ministère
            <br /> de la culture
          </>
        }
        homeLinkProps={{ title: "Compte rendu vif", href: "/" }}
      />
      <Button iconId="fr-icon-add-line">Créer un CR</Button>
      <RepoContext.Provider value={repo}>
        <Counter />
      </RepoContext.Provider>
    </MuiDsfrThemeProvider>
  );
}

export default App;
