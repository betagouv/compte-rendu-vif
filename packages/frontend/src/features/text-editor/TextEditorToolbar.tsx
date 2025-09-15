import Button from "@codegouvfr/react-dsfr/Button";
import { useContext, useState } from "react";
import { TextEditorContext } from "./TextEditorContext";
import { Box, Popover, Stack, styled } from "@mui/material";
import { fr } from "@codegouvfr/react-dsfr";

const ToolbarButton = styled(Button)<{ isActive?: boolean }>(({ isActive }) => ({
  color: isActive ? "white" : fr.colors.decisions.background.flat.blueFrance.default,
  backgroundColor: isActive ? fr.colors.decisions.background.flat.blueFrance.default : "white",
  "::before": {
    marginRight: "0px !important",
  },
}));

export const TextEditorToolbar = () => {
  const { editor } = useContext(TextEditorContext);

  if (!editor) return null;

  return (
    <>
      <ToolbarButton
        isActive={editor.isActive("bold")}
        size="medium"
        priority="tertiary no outline"
        iconId="fr-icon-bold"
        type="button"
        nativeButtonProps={{
          onPointerDown: (event) => event.preventDefault(),
          onClick: () => editor.chain().focus().toggleBold().run(),
        }}
      >
        {null}
      </ToolbarButton>
      <ToolbarButton
        isActive={editor.isActive("italic")}
        size="medium"
        priority="tertiary no outline"
        type="button"
        iconId="fr-icon-italic"
        nativeButtonProps={{
          onPointerDown: (event) => event.preventDefault(),
          onClick: () => editor.chain().focus().toggleItalic().run(),
        }}
      >
        {null}
      </ToolbarButton>
      <ToolbarButton
        isActive={editor.isActive("underline")}
        size="medium"
        priority="tertiary no outline"
        iconId="ri-underline"
        type="button"
        nativeButtonProps={{
          onPointerDown: (event) => event.preventDefault(),
          onClick: () => editor.chain().focus().toggleUnderline().run(),
        }}
      >
        {null}
      </ToolbarButton>

      <ColorInput />
    </>
  );
};

const ColorInput = () => {
  const editor = useContext(TextEditorContext).editor!;
  const [anchorEl, baseSetAnchorEl] = useState<Element | null>(null);
  const [currentValue, setCurrentValue] = useState(editor.getAttributes("textStyle").color ?? "#000000");

  const setAnchorEl = (e: React.MouseEvent) => {
    baseSetAnchorEl(e.currentTarget);

    if (anchorEl) {
      setCurrentValue(editor.getAttributes("textStyle").color ?? "#000000");
    }
  };

  const onClose = () => {
    baseSetAnchorEl(null);
  };

  return (
    <>
      <ToolbarButton
        aria-describedby="color-picker"
        size="medium"
        priority="tertiary no outline"
        iconId="ri-palette-line"
        type="button"
        nativeButtonProps={{
          onPointerDown: (event) => event.preventDefault(),
          onClick: (event) => setAnchorEl(event),
        }}
      >
        {null}
      </ToolbarButton>
      <Popover
        id="color-picker"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Stack gap="8px" width="100%" p="8px">
          <Stack gap="8px" flexDirection="row" justifyContent="space-around" width="100%">
            <ColorButton onClose={onClose} value={currentValue} color="black" />
            <ColorButton onClose={onClose} value={currentValue} color="#e1000f" />
            <ColorButton onClose={onClose} value={currentValue} color="#d64d00" />
          </Stack>
          <Stack gap="8px" flexDirection="row" width="100%">
            <ColorButton onClose={onClose} value={currentValue} color="#000091" />
            <ColorButton onClose={onClose} value={currentValue} color="#118d49" />
            <div />
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

const ColorButton = ({ color, value, onClose }: { color: string; value: string; onClose: () => void }) => {
  const editor = useContext(TextEditorContext).editor!;

  const isSelected = value === color;

  return (
    <Box
      component="button"
      type="button"
      onClick={() => {
        editor.chain().focus().setColor(color).run();
        onClose?.();
      }}
      style={{
        backgroundColor: color,
      }}
      border={isSelected ? "1px solid black" : undefined}
      borderRadius="50%"
      width="30px"
      height="30px"
    ></Box>
  );
};
