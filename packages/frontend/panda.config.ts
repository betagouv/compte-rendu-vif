import { defineConfig, definePreset } from '@pandacss/dev'
import theme from './dsfr-tokens.json'

const dsfrPreset = definePreset(theme)

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', 'theme/**/*.ts'],

  // Files to exclude
  exclude: [],

  jsxFramework: 'react',

  presets: [dsfrPreset],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {},
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
})
