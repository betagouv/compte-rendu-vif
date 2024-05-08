import * as cssTree from "css-tree";
import fs from "fs/promises";
import { fr } from "@codegouvfr/react-dsfr";

export const parseTree = async (css: string) => {
  const variables = getColorVariablesFromFr();
  await fs.writeFile("./dsfr-variables.json", JSON.stringify(variables, null, 2));

  const ast = cssTree.parse(css, {
    parseValue: true,
    parseCustomProperty: true,
  });
  cssTree.walk(ast, {
    visit: "Declaration",
    enter: (node, item, list) => {
      if (node.property.startsWith("--")) {
        const varName = node.property.slice(2);
        const shouldRemove = variables.some((v) => v.toReplace === "--" + varName);
        if (shouldRemove) list.remove(item);
      }
    },
  });

  cssTree.walk(ast, {
    visit: "Function",
    enter: (node) => {
      if (node.name === "var") {
        if (node.name === "var" && node.children.size === 1 && node.children.first?.type === "Identifier") {
          const child = node.children.first;
          const matchingPandaVariable = variables.find((v) => v.toReplace === child.name);
          if (matchingPandaVariable) {
            child.name = matchingPandaVariable.pandaName;
          }
        }
      }
    },
  });

  // find :root and extract its content
  const root = cssTree.find(ast, (node) => {});
  const patchedCss = cssTree.generate(ast);
  await fs.writeFile("./public/dsfr/dsfr-patched.css", patchedCss);
};

const getColorVariablesFromFr = () => {
  const dotPaths = getEveryDotPath(fr.colors);

  const lightFr = fr.colors.getHex({ isDark: false });
  const darkFr = fr.colors.getHex({ isDark: true });

  const variables = dotPaths.map((path) => {
    const toReplace = pathWithDots(fr.colors, path).slice("var(".length, -")".length);

    const lightValue = pathWithDots(lightFr, path);
    const darkValue = pathWithDots(darkFr, path);

    const name = formatName(path);
    const pandaName = "--colors-" + name.replace(/\./g, "-");

    return { path, lightValue, darkValue, name, toReplace, pandaName };
  });

  return variables;
};

const formatName = (name: string) => {
  const parts = name.split(".").map((part) => (part.startsWith("_") ? part.slice(1).replace("_", "-") : part));
  parts.shift();
  if (parts[-1] === "default") parts.pop();

  return parts.join("-");
};

const getEveryDotPath = (obj: any) => {
  const dotPaths = [] as string[];

  const traverse = (obj: any, path: string) => {
    for (const key in obj) {
      if (typeof obj[key] === "function") continue;

      const newPath = path ? `${path}.${key}` : key;

      if (typeof obj[key] === "object") {
        traverse(obj[key], newPath);
      } else {
        dotPaths.push(newPath);
      }
    }
  };

  traverse(obj, "");

  return dotPaths;
};

const pathWithDots = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc[key], obj);
};
