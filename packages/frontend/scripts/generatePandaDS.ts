import { fr } from '@codegouvfr/react-dsfr'
import { spacingTokenByValue } from '@codegouvfr/react-dsfr/fr/generatedFromCss/spacing'
import { Tokens, defineConfig } from '@pandacss/dev'
import fs from 'fs/promises'

const parseDS = async () => {
  const { textStyles, fontWeights } = parseTypography()

  const tokens = defineConfig({
    theme: {
      extend: {
        tokens: {
          colors: parseColorDecisions(),
          spacing: parseSpacings(),
          fontWeights,
        },
        breakpoints: parseBreakpoints(),
        textStyles,
      },
    },
  })

  await fs.writeFile('./dsfr-tokens.json', JSON.stringify(tokens, null, 2))
}

const parseColorDecisions = () => {
  return Object.entries(fr.colors.decisions).reduce(
    (acc, [context, variants]) => {
      Object.entries(variants).forEach(([variant, colors]) => {
        Object.entries(colors).forEach(([colorName, usages]) => {
          Object.entries(usages as any).forEach(([usage, color]: any) => {
            const path = [context, variant, colorName, ...(usage === 'default' ? [] : [usage])].join('.')
            acc[path] = { value: color }
          })
        })
      })

      return acc
    },
    {} as NonNullable<Tokens['colors']>,
  )
}

const parseSpacings = () => {
  return Object.entries(spacingTokenByValue).reduce(
    (acc, [spacingName, spacingValue]) => {
      acc[spacingName] = { value: spacingValue }

      return acc
    },
    {} as NonNullable<Tokens['spacing']>,
  )
}

const parseBreakpoints = () => {
  const breakpoints = Object.entries(fr.breakpoints.values).reduce(
    (acc, [breakpointName, breakpointValue]) => {
      acc[breakpointName] = breakpointValue

      return acc
    },
    {} as Record<string, string>,
  )

  // panda needs a 2xl breakpoing with em unit
  breakpoints['2xl'] = '96em'

  return breakpoints
}

const parseTypography = () => {
  const textStyles: any = {}
  const fontWeights: Tokens['fontWeights'] = {}

  fr.typography.forEach((typo) => {
    const name = typo.selector
    if (!name.startsWith('.fr-')) return
    const [_, context, __, variant] = name.split('-')

    if (Object.keys(typo.style).length === 1 && (typo.style as any).fontWeight) {
      fontWeights[variant] = { value: (typo.style as any).fontWeight }
      return
    }

    const style = typo.style as any

    const mediaQueryKey = Object.keys(style).find((key) => key.startsWith('@media'))
    const mediaQuery = style[mediaQueryKey as string]

    textStyles[`${context}-${variant}`] = {
      value: {
        base: {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
        },
        ...(mediaQuery ? { md: mediaQuery } : {}),
      },
    }
  })

  return { textStyles, fontWeights }
}

parseDS()
