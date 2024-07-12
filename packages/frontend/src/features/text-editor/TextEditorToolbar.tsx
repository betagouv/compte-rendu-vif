import { cva } from "#styled-system/css";
import { HStack, Stack } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { useContext, useState } from "react";
import { ColorPicker } from "../../components/ColorPicker";
import { TextEditorContext } from "./TextEditorContext";

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
          active: editor.isActive("underline"),
        })}
        size="small"
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
    <ColorPicker.Root
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
      value={currentValue}
      onValueChangeEnd={(e) => editor.chain().focus().setColor(e.value.toString("hex")).run()}
      closeOnSelect={false}
    >
      {() => (
        <>
          <ColorPicker.Control>
            <ColorPicker.Trigger asChild>
              <Button
                className={toolbarButtonRecipe()}
                size="small"
                priority="tertiary no outline"
                iconId="ri-palette-line"
                type="button"
                nativeButtonProps={{
                  onPointerDown: (event) => event.preventDefault(),
                }}
              ></Button>
            </ColorPicker.Trigger>
          </ColorPicker.Control>
          <ColorPicker.Positioner>
            <ColorPicker.Content w="200px">
              <Stack gap="3">
                <ColorPicker.Area>
                  <ColorPicker.AreaBackground />
                  <ColorPicker.AreaThumb />
                </ColorPicker.Area>
                <HStack gap="3">
                  <Stack flex="1" gap="2">
                    <ColorPicker.ChannelSlider channel="hue">
                      <ColorPicker.ChannelSliderTrack />
                      <ColorPicker.ChannelSliderThumb />
                    </ColorPicker.ChannelSlider>
                  </Stack>
                </HStack>
                {/* <Stack gap="1.5">
                    <Text size="xs" color="fg.default" fontWeight="medium">
                      Saved Colors
                    </Text>
                    <ColorPicker.SwatchGroup>
                      {presets.map((color, id) => (
                        <ColorPicker.SwatchTrigger key={id} value={color}>
                          <ColorPicker.Swatch value={color} />
                        </ColorPicker.SwatchTrigger>
                      ))}
                    </ColorPicker.SwatchGroup>
                  </Stack> */}
              </Stack>
            </ColorPicker.Content>
          </ColorPicker.Positioner>
        </>
      )}
    </ColorPicker.Root>
    // <input
    //   id="text-color"
    //   // className={css({ visibility: "hidden", width: "0px", margin: 0, padding: 0 })}
    //   type="color"
    //   onInput={(event) =>
    //     editor
    //       .chain()
    //       .focus()
    //       .setColor((event.target as any).value)
    //       .run()
    //   }
    //   value={editor.getAttributes("textStyle").color ?? "#000000"}
    // />
  );
};
