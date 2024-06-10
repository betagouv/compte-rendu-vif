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
      zIndex: 1,
      flex: "1",
      justifyContent: "start",
      height: "56px !important",
      color: "black",
      fontSize: { base: "16px !important", lg: "20px !important" },
      fontWeight: "bold !important",
      bgColor: "#ECECFE",
      nowrap: true,
      _selected: {
        zIndex: 2,
        bgColor: "white !important",
        boxShadow: "6px 0px 10px 3px rgba(0, 0, 0, .05), -6px 0px 10px 3px rgba(0, 0, 0, .05)",
        _hover: {},
      },
      _horizontal: {
        pt: "2.5",
      },
      _hover: {
        color: "black",
        bgColor: "#DADAFD",
      },
    },
    content: {
      fontWeight: "regular",
    },
  },
});
