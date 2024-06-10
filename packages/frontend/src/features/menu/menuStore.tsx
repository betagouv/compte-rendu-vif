import { createStore } from "@xstate/store";
import { NestedMenu } from "./MenuButton";

export const menuStore = createStore(
  {
    menu: null as NestedMenu | null,
  },
  {
    setMenu: { menu: (_, event: { menu: NestedMenu | null }) => event.menu },
  },
);
