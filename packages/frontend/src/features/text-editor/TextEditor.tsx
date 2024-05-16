import { Placeholder } from "@tiptap/extension-placeholder";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useContext, useEffect } from "react";
import { css, cx } from "#styled-system/css";
import { TextEditorToolbar } from "./TextEditorToolbar";
import { TextEditorContext } from "./TextEditorContext";

interface Props {
  defaultValue?: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readOnly?: boolean;
  placeholder?: string;
}

export const useTextEditor = (props: Props) => {
  const { defaultValue, onChange, autoFocus, readOnly, placeholder } = props;

  return useEditor({
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
  });
};

export const TextEditor = (props: { hasSubmitted?: boolean }) => {
  const { hasSubmitted } = props;

  const { editor } = useContext(TextEditorContext);

  const isEditorActive = !!editor;

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (hasSubmitted && isEditorActive) {
      editor.commands.clearContent(true);
    }
  }, [isEditorActive, hasSubmitted]);

  return (
    <div className={cx(css({ flex: 1 }))}>
      {/* {editor && <TextEditorToolbar editor={editor} />} */}
      <EditorContent className={textEditorClassName} editor={editor} />
    </div>
  );
};

export const textEditorClassName = css({
  h: "100%",
  minH: "160px",
  "& > div": {
    outline: "none",
    roundedTop: "md",
    borderWidth: "1px",
    h: "100%",
    minH: "160px",
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
