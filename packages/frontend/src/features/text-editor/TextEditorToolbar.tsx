import { cva, css } from "#styled-system/css";
import { hstack } from "#styled-system/patterns";
import type { Editor } from "@tiptap/react";
import { useContext, useRef } from "react";
import { LuBold, LuItalic, LuStrikethrough } from "react-icons/lu";
import { TextEditorContext } from "./TextEditorContext";
import Button from "@codegouvfr/react-dsfr/Button";
import { useDebounce } from "react-use";

const toolbar = hstack({
  gap: "5px",
  roundedBottom: "sm",
  mt: "-1px",
  lineHeight: "0",
  transition: "all 0.15s",
});

const toolbarButtonRecipe = cva({
  base: {
    color: "grey",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // w: "8",
    // h: "8",
    bg: "white",
  },
  variants: {
    active: {
      true: {
        color: "black",
        bg: "gray.600",
      },
    },
  },
});

interface Props {
  editor: Editor;
}

export const TextEditorToolbar = () => {
  const { editor } = useContext(TextEditorContext);

  if (!editor) return null;

  return (
    <>
      <Button
        className={toolbarButtonRecipe({
          active: editor.isActive("bold"),
        })}
        size="small"
        priority="tertiary no outline"
        iconId="fr-icon-bold"
        type="button"
        nativeButtonProps={{
          onPointerDown: (event) => event.preventDefault(),
          onClick: () => editor.chain().focus().toggleBold().run(),
        }}
      ></Button>
      <Button
        className={toolbarButtonRecipe({
          active: editor.isActive("italic"),
        })}
        size="small"
        priority="tertiary no outline"
        type="button"
        iconId="fr-icon-italic"
        nativeButtonProps={{
          onPointerDown: (event) => event.preventDefault(),
          onClick: () => editor.chain().focus().toggleItalic().run(),
        }}
      ></Button>
      <Button
        className={toolbarButtonRecipe({
          active: editor.isActive("strike"),
        })}
        size="small"
        priority="tertiary no outline"
        iconId="ri-underline"
        type="button"
        nativeButtonProps={{
          onPointerDown: (event) => event.preventDefault(),
          onClick: () => editor.chain().focus().toggleStrike().run(),
        }}
      ></Button>
      <ColorInput />
    </>
  );
};

const ColorInput = () => {
  const editor = useContext(TextEditorContext).editor!;

  return (
    <input
      id="text-color"
      // className={css({ visibility: "hidden", width: "0px", margin: 0, padding: 0 })}
      type="color"
      onInput={(event) =>
        editor
          .chain()
          .focus()
          .setColor((event.target as any).value)
          .run()
      }
      value={editor.getAttributes("textStyle").color ?? "#000000"}
    />
  );
};
