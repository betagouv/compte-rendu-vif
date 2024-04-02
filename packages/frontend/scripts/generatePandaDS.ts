import { SemanticTokens, defineConfig } from "@pandacss/dev";
import fs from "fs/promises";
import * as cssTree from "css-tree";

import { parseTypography, parseSpacings, parseBreakpoints } from "./parseDsfrFRVariable";

const parseDS = async () => {
  const { textStyles, fontWeights } = parseTypography();

  let dsfrContent = await fs.readFile("./public/dsfr/dsfr.min.css", "utf-8");
  dsfrContent = dsfrContent.slice('@charset "UTF-8";'.length);

  const variables = listEveryVariable(dsfrContent);
  const everyVariable = { ...variables.light, ...variables.dark };
  const semanticColorTokens = getSemanticTokens(variables);

  const tokens = defineConfig({
    theme: {
      extend: {
        tokens: {
          spacing: parseSpacings(),
          fontWeights,
        },
        semanticTokens: {
          colors: semanticColorTokens,
        },
        breakpoints: parseBreakpoints(),
        textStyles,
      },
    },
  });

  await fs.writeFile("./dsfr-tokens.json", JSON.stringify(tokens, null, 2));

  const newRootBlock = removeDSFRVariables(dsfrContent, everyVariable);
  dsfrContent = getNextBlock({ content: dsfrContent, blockName: ":root[data-fr-theme=dark]", remove: true })!.rest;
  dsfrContent = getNextBlock({ content: dsfrContent, blockName: ":root", remove: true })!.rest;

  dsfrContent = replaceDSFRVariablesWithPanda(dsfrContent, everyVariable);
  const fontFaces = [] as { start: number; end: number; block: string }[];

  // find and remove all font-faces
  while (dsfrContent.includes("@font-face")) {
    const { rest, ...item } = getNextBlock({ content: dsfrContent, blockName: "@font-face", remove: true })!;
    fontFaces.push(item);

    dsfrContent = rest;
  }

  const newContent = [newRootBlock, ...fontFaces.map((f) => f.block), "@layer dsfr {", dsfrContent, "}"].join("\n");

  await fs.writeFile("./public/dsfr/dsfr-patched.css", newContent);
};

const colorValueRegex = /#[0-9a-fA-F]{3,6}/;

const listEveryVariable = (content: string) => {
  const { block: rootBlock } = getNextBlock({ content, blockName: ":root" })!;
  const { block: rootBlockDark } = getNextBlock({ content, blockName: ":root[data-fr-theme=dark]" })!;

  const variables = {} as Record<string, string>;
  const variablesDark = {} as Record<string, string>;

  let ast = cssTree.parse(rootBlock, { context: "stylesheet" });

  cssTree.walk(ast, {
    visit: "Declaration",
    enter(node: cssTree.Declaration) {
      if (node.property.startsWith("--")) {
        variables[node.property as string] = (node.value as cssTree.Raw).value;
      }
    },
  });

  ast = cssTree.parse(rootBlockDark, { context: "stylesheet" });
  cssTree.walk(ast, {
    visit: "Declaration",
    enter(node: cssTree.Declaration) {
      if (node.property.startsWith("--")) {
        variablesDark[node.property as string] = (node.value as cssTree.Raw).value;
      }
    },
  });

  return { light: filterColorVariables(variables), dark: filterColorVariables(variablesDark) };
};

const filterColorVariables = (variables: Record<string, string>) => {
  return Object.entries(variables).reduce(
    (acc, [key, value]) => {
      const flatValue = value.includes("var(")
        ? value.replace(/var\((.*)\)/, (_, varName) => variables[varName])
        : value;

      if (!colorValueRegex.test(flatValue)) return acc;

      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
};

const getSemanticTokens = (variables: ReturnType<typeof listEveryVariable>) => {
  const colorDecisions = Object.entries(variables.light).reduce(
    (acc, [key, value]) => {
      // TODO: check if a semantic token can reference another one
      // const darkValue = variables.dark[key];
      // const baseValue = isPrimitive ? value : `{colors.${value.slice("var(--".length, -1)}}`;
      const isPrimitive = !value.includes("var(");

      const darkValue = variables.dark[isPrimitive ? key : value.slice("var(".length, -1)];
      const baseValue = isPrimitive ? value : value.replace(/var\((.*)\)/, (_, varName) => variables.light[varName]);

      const cleanKey = key.replace("--", "");
      acc[cleanKey] = { value: { base: baseValue, _dark: darkValue } };

      return acc;
    },
    {} as NonNullable<SemanticTokens["colors"]>,
  );

  return colorDecisions;
};

const replaceDSFRVariablesWithPanda = (content: string, variables: Record<string, any>) => {
  const ast = cssTree.parse(content, { context: "stylesheet" });

  cssTree.walk(ast, {
    visit: "Function",
    enter(node: cssTree.FunctionNode) {
      if (node.name === "var") {
        const child = node.children.first as cssTree.Identifier;

        if (!child) return;
        if (!variables[child.name]) return;

        child.name = formatVariableName(child.name);
      }
    },
  });

  return cssTree.generate(ast);
};

const formatVariableName = (name: string) => "--colors-" + name.slice(2);

const removeDSFRVariables = (content: string, variables: Record<string, any>) => {
  const { block: rootBlock, end } = getNextBlock({ content, blockName: ":root" })!;
  content = content.slice(end);

  const rootAst = cssTree.parse(rootBlock, { context: "stylesheet" });
  cssTree.walk(rootAst, {
    visit: "Declaration",
    enter(node: cssTree.Declaration, item, list) {
      if (variables[node.property as string]) {
        list.remove(item);
      }
    },
  });

  const newRootBlock = cssTree.generate(rootAst);

  return newRootBlock;
};

const getNextBlock = ({ content, blockName, remove }: { content: string; blockName: string; remove?: boolean }) => {
  const start = content.indexOf(blockName + "{");
  if (start === -1) return null;
  const end = content.indexOf("}", start) + 1;

  const block = content.slice(start, end);
  if (remove) {
    content = content.replace(block, "");
  }

  return { start, end, block, rest: content };
};

parseDS();
