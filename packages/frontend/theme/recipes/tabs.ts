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
      height: "56px !important",
      color: "black",
      fontSize: "20px !important",
      fontWeight: "bold !important",
      bgColor: "#ECECFE",
      _selected: {
        zIndex: 2,
        bgColor: "white",
        boxShadow: "6px 0px 10px 3px rgba(0, 0, 0, .05), -6px 0px 10px 3px rgba(0, 0, 0, .05)",
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
