import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PropsWithChildren, createContext, useState } from "react";

export const TextEditorContext = createContext<{ editor: Editor | null }>({
  editor: null,
});

export const TextEditorContextProvider = ({ children }: PropsWithChildren) => {
  const editor = useEditor({
    autofocus: false,
    editable: true,
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
      Placeholder.configure({}),
      TextStyle.configure(),
    ],
    content: "",
  });

  return <TextEditorContext.Provider value={{ editor }}>{children}</TextEditorContext.Provider>;
};
