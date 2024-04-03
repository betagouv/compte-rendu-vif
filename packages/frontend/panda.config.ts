import { defineConfig, definePreset } from "@pandacss/dev";
import theme from "./dsfr-tokens.json";
import { tabs } from "./theme/recipes/tabs";

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
  theme: {
    extend: {
      slotRecipes: {
        tabs: tabs,
      },
      tokens: {},
      semanticTokens: {},
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
