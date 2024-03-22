import { TriplitClient } from "@triplit/client";

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ4LXRyaXBsaXQtdXNlci1pZCI6ImxlZG91eG0iLCJ4LXRyaXBsaXQtcHJvamVjdC1pZCI6ImNydmlmIiwieC10cmlwbGl0LXRva2VuLXR5cGUiOiJleHRlcm5hbCIsImlhdCI6MTcxMTAzNTIwNH0.xeGN84suho6GDZevver4IDLc8_8MFODMF2uADjDBsaM";

export const db = new TriplitClient({
  storage: "indexeddb",
  serverUrl: "http://localhost:3000",
  migrations: migrations,
  token: mockToken,
  schema: schema,
  autoConnect: true,
});

import { migrations } from "../triplit/migrations";
import { schema } from "../triplit/schema";
