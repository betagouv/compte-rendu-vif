import fs from "node:fs/promises";
import { defineConfig } from "@pandacss/dev";
import { parseBreakpoints, parseSpacings, parseTypography } from "./parseDsfrFRVariable";

export const generatePandaDSRegex = async () => {
  let dsfrContent = await fs.readFile("./public/dsfr/dsfr.min.css", "utf-8");
  dsfrContent = dsfrContent.slice('@charset "UTF-8";'.length);

  const parser = new Parser(dsfrContent);

  parser.replaceUrls();
  const fontFaces = parser.extractFontFaces();
  const { light, dark, rootBlock, darkRootBlock } = parser.extractLightAndDarkVariables();
  const semanticTokens = getSemanticTokens({ light, dark });

  const replaced = parser.replaceVariableNames(semanticTokens);
  const newContent = [rootBlock, darkRootBlock, ...fontFaces, "@layer dsfr {", replaced, "}"].join("\n");

  const { textStyles, fontWeights } = parseTypography();

  const tokens = defineConfig({
    theme: {
      extend: {
        tokens: {
          spacing: parseSpacings(),
          fontWeights,
        },
        semanticTokens: {
          colors: semanticTokens,
        },
        breakpoints: parseBreakpoints(),
        textStyles,
      },
    },
  });

  await fs.writeFile("./dsfr-tokens.json", JSON.stringify(tokens, null, 2));

  const indexContent = await fs.readFile("./index.dist.css", "utf-8");
  await fs.writeFile("./src/index.css", `${indexContent}\n\n${newContent}`);
};

const getSemanticTokens = ({ light, dark }: { light: Record<string, string>; dark: Record<string, string> }) => {
  const grouped = {} as Record<string, { value: { base: string; _dark: string } }>;

  for (const [name, value] of Object.entries(light)) {
    const isPrimitive = !value.includes("var(");

    const atomicVarName = isPrimitive ? name : value.replace(/var\((.*)\)/, (_, varName) => varName);

    const lightValue = light[atomicVarName];
    const darkValue = dark[atomicVarName];

    grouped[name.replace("--", "")] = {
      value: { base: lightValue, _dark: darkValue },
    };
  }

  return grouped;
};

class Parser {
  constructor(public content: string) {}

  replaceUrls = () => {
    this.content = this.content.replaceAll(/url\("([^"]+)\"\)/g, (match, capturedUrl) => {
      if (capturedUrl.startsWith("data:")) return match;

      return `url("/dsfr/${capturedUrl}")`;
    });
  };

  getBlockAndRemove = (blockName: string) => {
    const { block, rest } = getNextBlock({
      content: this.content,
      blockName,
      remove: true,
    })!;
    this.content = rest;
    return block;
  };

  extractFontFaces = () => {
    const fontFaces = [] as string[];

    while (this.content.includes("@font-face")) {
      const block = this.getBlockAndRemove("@font-face")!;
      fontFaces.push(block);
    }

    return fontFaces;
  };

  extractLightAndDarkVariables = () => {
    const lightVariablesRaw = this.extractVariables(this.getBlockAndRemove(":root")!);
    const darkVariablesRaw = this.extractVariables(this.getBlockAndRemove(":root[data-fr-theme=dark]")!);

    const lightVariables = this.filterColorVariables(lightVariablesRaw);
    const darkVariables = this.filterColorVariables(darkVariablesRaw);

    const rootBlock = `:root{${Object.entries(lightVariables.untouched)
      .map(([name, value]) => `${name}:${value};`)
      .join("")}}`;
    const darkRootBlock = `:root[data-fr-theme=dark]{${Object.entries(darkVariables.untouched)
      .map(([name, value]) => `${name}:${value};`)
      .join("")}}`;

    return {
      light: lightVariables.colors,
      dark: darkVariables.colors,
      rootBlock,
      darkRootBlock,
    };
  };

  extractVariables = (block: string) => {
    const variables = {} as Record<string, string>;

    let match: RegExpExecArray | null;
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    while ((match = variableDeclRegex.exec(block))) {
      const [variableDecl] = match;
      const [name, value] = variableDecl.split(":");

      variables[name] = value.replace(";", "");
    }

    return variables;
  };

  filterColorVariables = (variables: Record<string, string>) => {
    return Object.entries(variables).reduce(
      (acc, [name, value]) => {
        const flatValue = value.includes("var(")
          ? value.replace(/var\((.*)\)/, (_, varName) => variables[varName])
          : value;

        if (colorValueRegex.test(flatValue)) {
          acc.colors[name] = value;
        } else {
          acc.untouched[name] = value;
        }

        return acc;
      },
      { untouched: {}, colors: {} } as {
        untouched: Record<string, string>;
        colors: Record<string, string>;
      },
    );
  };

  replaceVariableNames = (semanticTokens: Record<string, any>) => {
    const variableNames = Object.keys(semanticTokens);

    for (const variableName of variableNames) {
      const pandaVariableName = `--colors-${variableName}`;
      const stringToReplace = `var(--${variableName})`;
      while (this.content.includes(stringToReplace)) {
        this.content = this.content.replace(stringToReplace, `var(${pandaVariableName})`);
      }
    }

    return this.content;
  };
}

const colorValueRegex = /#[0-9a-fA-F]{3,6}/;
const variableDeclRegex = /--[^:]+:[^;]+;/g;

const getNextBlock = ({ content, blockName, remove }: { content: string; blockName: string; remove?: boolean }) => {
  const start = content.indexOf(`${blockName}{`);
  if (start === -1) return null;
  const end = content.indexOf("}", start) + 1;

  const block = content.slice(start, end);
  if (remove) {
    content = content.replace(block, "");
  }

  return { block, rest: content };
};

generatePandaDSRegex();
