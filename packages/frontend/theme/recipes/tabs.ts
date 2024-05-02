import { tabsAnatomy } from "@ark-ui/anatomy";
import { defineSlotRecipe } from "@pandacss/dev";

export const tabs = defineSlotRecipe({
  className: "tabs",
  slots: tabsAnatomy.keys(),
  base: {
    root: {
      width: "full",
      fontWeight: "bold",
    },
    list: {
      gap: "0 !important",
    },
    trigger: {
      display: "flex",
      flex: "1",
      justifyContent: "start",
      color: "black",
      fontSize: "16px",
      fontWeight: "bold !important",
      bgColor: "#ECECFE",
      _selected: {
        bgColor: "white",
        _hover: {},
      },
      _horizontal: {
        pt: "2.5",
      },
      _hover: {},
    },
    content: {
      fontWeight: "regular",
    },
  },
});
