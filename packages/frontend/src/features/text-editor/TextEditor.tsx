import { Placeholder } from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { css } from "#styled-system/css";
import { TextEditorToolbar } from "./TextEditorToolbar";

interface Props {
  defaultValue?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  hasSubmitted?: boolean;
}

export const TextEditor = (props: Props) => {
  const { defaultValue, onChange, autoFocus, readOnly, placeholder, hasSubmitted } = props;

  const editor = useEditor({
    autofocus: autoFocus ?? false,
    editable: !readOnly,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        code: {
          HTMLAttributes: {
            class: "inline",
          },
        },
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextStyle.configure(),
    ],
    content: defaultValue,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  const isEditorActive = !!editor;

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (hasSubmitted && isEditorActive) {
      editor.commands.clearContent(true);
    }
  }, [isEditorActive, hasSubmitted]);

  return (
    <div className="text-edito">
      <EditorContent className={textEditorClassName} editor={editor} />
      {editor && <TextEditorToolbar editor={editor} />}
    </div>
  );
};

export const textEditorClassName = css({
  minH: "160px",
  "& > div": {
    outline: "none",
    roundedTop: "md",
    borderWidth: "1px",
    minH: "160px",
    maxH: "240px",
    py: "2",
    px: "2",
    fontSize: "13px",
    overflowY: "auto",
    _focusVisible: {
      outlineWidth: "1px",
      borderColor: "purple.500",
      outlineColor: "purple.500",
      outlineStyle: "solid",
    },
    "& em": {
      fontStyle: "italic",
    },
    "& :where(ul, ol, li)": {
      listStyle: "unset",
    },
    "& :where(ul, ol)": {
      paddingStart: "1rem",
    },
    "& blockquote": {
      borderLeftWidth: "3px",
      borderColor: "gray.300",
      paddingLeft: "4",
    },
    "& a": {
      color: "purple.600",
    },
    "& code.inline": {
      rounded: "2px",
      borderWidth: "1px",
      mb: "1px",
      padding: "2px 3px 1px",
      fontFamily: "mono",
      fontSize: "0.9em",
      bg: "gray.600",
    },
  },
});
