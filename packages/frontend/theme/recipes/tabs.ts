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
      flex: "1",
      color: "text-title-blue-france",
      fontSize: "16px",
      bgColor: "#C1C1FB",
      _selected: {
        color: "text-title-blue-france",
        bgColor: "white",
        _hover: {
          color: "text-title-blue-france",
        },
      },
      _horizontal: {
        pt: "2.5",
      },
      _hover: {
        color: "text-title-blue-france",
      },
    },
    content: {
      fontWeight: "regular",
    },
  },
});
