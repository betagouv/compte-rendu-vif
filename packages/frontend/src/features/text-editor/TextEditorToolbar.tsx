import type { Editor } from "@tiptap/react";
import {
  LuBold,
  LuCode,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuQuote,
  LuStrikethrough,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
} from "react-icons/lu";
import { cva } from "#styled-system/css";
import { hstack } from "#styled-system/patterns";

const toolbar = hstack({
  gap: "0",
  roundedBottom: "sm",
  borderWidth: "1px",
  mt: "-1px",
  lineHeight: "0",
  transition: "all 0.15s",
});

const toolbarButtonRecipe = cva({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    w: "8",
    h: "8",
  },
  variants: {
    active: {
      true: {
        color: "gray.100",
        bg: "gray.600",
      },
    },
  },
});

interface Props {
  editor: Editor;
}

export const TextEditorToolbar = (props: Props) => {
  const { editor } = props;

  return (
    <div className={toolbar}>
      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={toolbarButtonRecipe({
          active: editor.isActive("bold"),
        })}
      >
        <LuBold />
      </button>
      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={toolbarButtonRecipe({
          active: editor.isActive("italic"),
        })}
      >
        <LuItalic />
      </button>
      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={toolbarButtonRecipe({
          active: editor.isActive("strike"),
        })}
      >
        <LuStrikethrough />
      </button>
      <input
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
      {/* <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={toolbarButtonRecipe({
          active: editor.isActive("bulletList"),
        })}
      >
        <LuList />
      </button>
      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={toolbarButtonRecipe({
          active: editor.isActive("orderedList"),
        })}
      >
        <LuListOrdered />
      </button>
      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={toolbarButtonRecipe({
          active: editor.isActive("blockquote"),
        })}
      >
        <LuQuote />
      </button>
      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={toolbarButtonRecipe({
          active: editor.isActive("code"),
        })}
      >
        <LuCode />
      </button> */}
      {/* <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => {
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);
          if (url === null) return; // cancelled
          if (url === "") {
            // empty
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
        className={toolbarButtonRecipe({
          active: editor.isActive("link"),
        })}
      >
        <LuLink />
      </button> */}
    </div>
  );
};
