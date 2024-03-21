import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "../styled-system/styles.css";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import Button from "@codegouvfr/react-dsfr/Button";
import { MuiDsfrThemeProvider } from "@codegouvfr/react-dsfr/mui";
import { css } from "#styled-system/css";
import { TriplitClient } from "@triplit/client";
import { useQuery } from "@triplit/react";

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdXNlci1pZCI6ImxlZG91eG0iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImNydmlmIiwieC10cmlwbGl0LXRva2VuLXR5cGUiOiJleHRlcm5hbCIsImlhdCI6MTcxMTAzNTIwNH0.xeGN84suho6GDZevver4IDLc8_8MFODMF2uADjDBsaM";

const client = new TriplitClient({
  storage: "indexeddb",
  serverUrl: "http://localhost:3000",
  token: mockToken,
  autoConnect: true,
});
const query = client.query("todos");

function App() {
  const [str, setStr] = useState("0");

  const insertInto = async () => {
    await client.insert("todos", {
      title: "My first todo",
      description: str,
      completed: false,
    });
  };

  const todos = useQuery(client, query);
  console.log(todos);

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
      <input value={str} onChange={(e) => setStr(e.target.value)} />
      <Button iconId="fr-icon-add-line" onClick={insertInto}>
        Créer un CR
      </Button>
    </MuiDsfrThemeProvider>
  );
}

export default App;
