import { cva } from "#styled-system/css";
import { Flex, HStack, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { useContext, useState } from "react";
import { ColorPicker } from "../../components/ColorPicker";
import { TextEditorContext } from "./TextEditorContext";
import { Popover } from "#components/Popover";

const toolbarButtonRecipe = cva({
  base: {
    color: "background-flat-blue-france",
    bg: "white",
  },
  variants: {
    active: {
      true: {
        color: "white",
        bg: "background-flat-blue-france",
      },
    },
  },
});

export const TextEditorToolbar = () => {
  const { editor } = useContext(TextEditorContext);

  if (!editor) return null;

  return (
    <>
      <Button
        className={toolbarButtonRecipe({
          active: editor.isActive("bold"),
        })}
        size="medium"
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
        size="medium"
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
          active: editor.isActive("underline"),
        })}
        size="medium"
        priority="tertiary no outline"
        iconId="ri-underline"
        type="button"
        nativeButtonProps={{
          onPointerDown: (event) => event.preventDefault(),
          onClick: () => editor.chain().focus().toggleUnderline().run(),
        }}
      ></Button>

      <ColorInput />
    </>
  );
};

const ColorInput = () => {
  const editor = useContext(TextEditorContext).editor!;
  const [isOpen, baseSetIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(editor.getAttributes("textStyle").color ?? "#000000");

  const setIsOpen = (isOpen: boolean) => {
    baseSetIsOpen(isOpen);

    if (isOpen) {
      setCurrentValue(editor.getAttributes("textStyle").color ?? "#000000");
    }
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
      <Popover.Trigger>
        <Button
          className={toolbarButtonRecipe({})}
          size="medium"
          priority="tertiary no outline"
          iconId="ri-palette-line"
          type="button"
          nativeButtonProps={{
            onPointerDown: (event) => event.preventDefault(),
          }}
        ></Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Stack p="8px">
            <Stack gap="8px" flexDir="row" justifyContent="space-around" w="100%">
              <ColorButton value={currentValue} color="black" />
              <ColorButton value={currentValue} color="#c9191e" />
              <ColorButton value={currentValue} color="#666666" />
            </Stack>
            <Stack gap="8px" flexDir="row" justifyContent="space-around" w="100%">
              <ColorButton value={currentValue} color="#cecece" />
              <ColorButton value={currentValue} color="#0078f3" />
              <ColorButton value={currentValue} color="#1f8d49" />
            </Stack>
            <Stack gap="8px" flexDir="row" justifyContent="space-around" w="100%">
              <ColorButton value={currentValue} color="#68a532" />
              <ColorButton value={currentValue} color="#e4794a" />
              <ColorButton value={currentValue} color="#272747" />
            </Stack>
          </Stack>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

const ColorButton = ({ color, value }: { color: string; value: string }) => {
  const editor = useContext(TextEditorContext).editor!;

  const isSelected = value === color;

  return (
    <styled.button
      type="button"
      onClick={() => {
        editor.chain().focus().setColor(color).run();
      }}
      style={{
        backgroundColor: color,
      }}
      border={isSelected ? "1px solid black" : undefined}
      borderRadius="50%"
      w="30px"
      h="30px"
    ></styled.button>
  );
};
