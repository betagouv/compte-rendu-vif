import { EditorContent } from "@tiptap/react";
import { useContext, useEffect } from "react";
import { TextEditorContext } from "./TextEditorContext";
import { Box, styled } from "@mui/material";

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
    <Box height="100%" mt="2">
      {/* {editor && <TextEditorToolbar editor={editor} />} */}
      <StyledEditorContent editor={editor} />
    </Box>
  );
};

const StyledEditorContent = styled(EditorContent)({
  height: "100%",
  minHeight: "160px",
  "> div": {
    outline: "none",
    borderRadius: "0 !important",
    borderTopLeftRadius: "0.375rem", // to check
    borderTopRightRadius: "0.375rem",
    borderWidth: "0px",
    height: "100%",
    minHeight: "160px",
    maxHeight: "100%",
    padding: "40px",
    fontSize: "13px",
    backgroundColor: "white",
    overflowY: "auto",
    ":focus-visible": {
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
      paddingInlineStart: "1rem",
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
