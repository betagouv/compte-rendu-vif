import Color from "@tiptap/extension-color";
import { HardBreak } from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { Editor, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PropsWithChildren, createContext } from "react";

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
      Underline.configure({}),
      Color.configure({
        types: ["textStyle"],
      }),
      Placeholder.configure({}),
      TextStyle.configure(),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
          };
        },
      }),
    ],
    content: "",
  });

  return <TextEditorContext.Provider value={{ editor }}>{children}</TextEditorContext.Provider>;
};
