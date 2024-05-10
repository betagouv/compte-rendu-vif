import { popoverAnatomy } from "@ark-ui/anatomy";
import { defineSlotRecipe } from "@pandacss/dev";

export const popover = defineSlotRecipe({
  className: "popover",
  slots: popoverAnatomy.keys(),
  base: {
    positioner: {
      position: "relative",
    },
    content: {
      display: "flex",
      zIndex: "popover",
      flexDirection: "column",
      borderRadius: "l3",
      maxWidth: "sm",
      p: "0",
      background: "bg.default",
      boxShadow: "lg",
      _open: {
        animation: "fadeIn 0.25s ease-out",
      },
      _closed: {
        animation: "fadeOut 0.2s ease-out",
      },
      _hidden: {
        display: "none",
      },
    },
    title: {
      textStyle: "sm",
      fontWeight: "medium",
    },
    description: {
      textStyle: "sm",
      color: "fg.muted",
    },
    closeTrigger: {
      color: "fg.muted",
    },
    arrow: {
      "--arrow-size": "var(--sizes-3)",
      "--arrow-background": "var(--colors-bg-default)",
    },
    arrowTip: {
      borderTopWidth: "1px",
      borderLeftWidth: "1px",
    },
  },
});
