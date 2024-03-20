import { HocuspocusProvider } from "@hocuspocus/provider";

export const provider = new HocuspocusProvider({
  url: "ws://localhost:3000",
  name: "tasks",
});
