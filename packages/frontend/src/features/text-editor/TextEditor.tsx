import { css, cx } from "#styled-system/css";
import { EditorContent } from "@tiptap/react";
import { useContext, useEffect } from "react";
import { TextEditorContext } from "./TextEditorContext";

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
    <div className={cx(css({ h: "100%", mt: "2" }))}>
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
    maxHeight: "100%",
    py: "2",
    px: "2",
    fontSize: "13px",
    bgColor: "white",
    overflowY: "auto",
    _focusVisible: {
      outlineWidth: "1px",
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
