import { defineConfig, definePreset } from "@pandacss/dev";
import theme from "./dsfr-tokens.json";
import { tabs } from "./theme/recipes/tabs";
import { popover } from "./theme/recipes/popover";

const dsfrPreset = definePreset(theme);

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "theme/**/*.ts"],

  // Files to exclude
  exclude: [],

  jsxFramework: "react",

  presets: ["@pandacss/preset-base", "@park-ui/panda-preset", dsfrPreset],

  // Useful for theme customization
  globalCss: {
    "#fr-header-mobile-overlay-button-close": {
      mt: "10px !important",
    },
  },
  theme: {
    extend: {
      slotRecipes: {
        tabs: tabs,
        popover: popover,
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      tokens: {
        colors: {
          "yellow-waiting": { value: "#FEECC2" },
          "red-offline": { value: "#FFE9E6" },
          "blue-connected": { value: "#E3E3FD" },
        },
        sizes: {
          "header-height": { value: "80px" },
        },
      },

      semanticTokens: {},
    },
  },
  utilities: {
    extend: {
      nowrap: {
        className: "text-nowrap",
        shorthand: "nowrap",
        values: { type: "boolean" },
        transform: (value) => {
          if (value) {
            return {
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            };
          }

          return {};
        },
      },
    },
  },

  patterns: {
    extend: {
      divider: {
        defaultValues: {
          bgColor: "#DDDDDD",
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
