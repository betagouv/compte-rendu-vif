import Color from "@tiptap/extension-color";
import { HardBreak } from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { Editor, mergeAttributes, Node, NodeViewWrapper, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PropsWithChildren, createContext } from "react";
import Image from "@tiptap/extension-image";
import { Box } from "@mui/material";
import FontSize from "@tiptap/extension-font-size";

import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { stateReportExtraCss } from "@cr-vif/pdf/constat";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { ColumnExtension } from "@gocapsule/column-extension";

export const TextEditorContext = createContext<{ editor: Editor | null }>({
  editor: null,
});

export const TextEditorContextProvider = ({ children }: PropsWithChildren) => {
  const editor = useEditor({
    autofocus: false,
    editable: true,
    parseOptions: {
      preserveWhitespace: "full",
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        code: {
          HTMLAttributes: {
            class: "inline",
          },
        },
      }),
      Underline.configure({}),
      Color.configure({
        types: ["textStyle"],
      }),
      Image.configure({
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),
      Placeholder.configure({}),
      TextStyle.configure({}),
      FontSize.configure({
        types: ["textStyle"],
      }),
      HardBreak.extend({}),
      CustomDiv,
      //   addKeyboardShortcuts() {
      //     return {
      //       // Enter: () => this.editor.commands.(),
      //       // ShiftEnter: () => this.editor.commands.setHardBreak(),
      //     };
      //   },
      // }),
      // Table.configure({
      //   resizable: true,
      //   allowTableNodeSelection: true,
      //   HTMLAttributes: {
      //     class: "pe-table",
      //   },
      // }),
      TableRow,
      TableHeader,
      TableCell,
      HorizontalRule,
      ColumnExtension,
    ],
    content: "",
  });

  return (
    <TextEditorContext.Provider value={{ editor }}>
      <Box
        className="text-editor-container"
        sx={{
          p: {
            lineHeight: "1.8rem",
          },

          ...stateReportExtraCss,
        }}
      >
        {children}
      </Box>
    </TextEditorContext.Provider>
  );
};

const CustomDiv = Node.create({
  name: "customDiv",
  group: "block",
  content: "block+",

  parseHTML() {
    console.log("parsing!!");
    return [
      {
        tag: "tr[data-unbreakable]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["tr", HTMLAttributes, 0];
  },

  addAttributes() {
    return {
      "data-unbreakable": {
        default: null,
        parseHTML: (element) => element.getAttribute("data-unbreakable"),
        renderHTML: (attributes) => {
          if (!attributes["data-unbreakable"]) {
            return {};
          }
          return {
            "data-unbreakable": attributes["data-unbreakable"],
          };
        },
      },
    };
  },
});
