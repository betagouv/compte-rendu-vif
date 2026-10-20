import { Box, Dialog, DialogTitle, Typography } from "@mui/material";
import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useId, useMemo, useState } from "react";
import { Alert, Button } from "#components/MUIDsfr.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { ModalBackButton, ModalCloseButton } from "../menu/MenuTitle";
import { getUpLevel, getUpRoot, type UnitePatrimoniale, type UpLevel, type UpSelection, type UpTree } from "./upApi";

const WHOLE = "__whole__";

type Selected = { up: UnitePatrimoniale | null; chemin: UpSelection["chemin"] };

/**
 * "Pour quelle partie du monument … souhaitez-vous réaliser un constat ?"
 * Lets the user pick the whole monument or one unité patrimoniale, browsing the hierarchy one level at a time.
 */
export const UpSelectionModal = ({
  open,
  monumentTitle,
  tree,
  initialUpId,
  currentUpLabel,
  showIntro = true,
  title = "Créer un constat d’état",
  confirmLabel = "Créer un constat",
  onCancel,
  onConfirm,
}: {
  open: boolean;
  monumentTitle: string;
  tree: UpTree;
  initialUpId?: string | null;
  /** e.g. "Corps de logis › Aile nord", shown when changing the UP of an existing constat */
  currentUpLabel?: string;
  showIntro?: boolean;
  title?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: (selection: UpSelection) => void;
}) => {
  const groupName = useId();
  const rootLevel = useMemo(() => getUpLevel(tree, tree.rootId), [tree]);

  const [stack, setStack] = useState<UpLevel[]>([rootLevel]);
  const [selected, setSelected] = useState<Selected | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    setStack([rootLevel]);
    // null = whole monument; an UP below the root level is not pre-selected (it is not visible here)
    if (initialUpId === null) setSelected({ up: null, chemin: [] });
    else {
      const initial = initialUpId ? rootLevel.enfants.find((e) => e.id === initialUpId) : undefined;
      setSelected(initial ? { up: initial, chemin: [] } : undefined);
    }
  }, [open, rootLevel, initialUpId]);

  const isRoot = stack.length === 1;
  const current = stack[stack.length - 1]!;
  // ancestors below the monument root, up to and including the current level's parent
  const cheminToCurrent = stack.slice(1).map((level) => ({ id: level.parent.id, intitule: level.parent.intitule }));

  // the radio value of the current level's "ensemble" option: the whole monument at root, the current UP below
  const wholeUp = isRoot ? null : current.parent;
  const selectedValue =
    selected === undefined ? undefined : selected.up === null ? (isRoot ? WHOLE : undefined) : selected.up.id;
  const wholeChecked = isRoot ? selectedValue === WHOLE : selectedValue === wholeUp?.id;

  const selectWhole = () => setSelected({ up: wholeUp, chemin: cheminToCurrent.slice(0, -1) });
  const selectChild = (up: UnitePatrimoniale) => setSelected({ up, chemin: cheminToCurrent });

  const openChild = (up: UnitePatrimoniale) => setStack((st) => [...st, getUpLevel(tree, up.id)]);

  const confirm = () => {
    if (!selected) return;
    onConfirm({ up: selected.up, chemin: selected.chemin, monument: getUpRoot(tree) });
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      sx={{
        ".MuiPaper-root": {
          overflowY: "auto",
          maxHeight: { xs: "unset", lg: "calc(100% - 64px)" },
          maxWidth: { xs: "unset", lg: "unset" },
          width: { xs: "100%", lg: "960px" },
          height: { xs: "100%", lg: "unset" },
          margin: { xs: "0", lg: undefined },
        },
      }}
    >
      <Box p={{ xs: "16px", lg: "16px 32px 32px" }}>
        <ModalCloseButton onClose={onCancel} />
        <DialogTitle px="0 !important" whiteSpace="wrap">
          {title}
        </DialogTitle>

        {isRoot ? (
          <>
            {showIntro ? (
              <Alert
                severity="info"
                small
                sx={{ mb: "24px" }}
                description={
                  <>
                    Vous pouvez réaliser un constat pour l’ensemble du monument ou pour ses unités patrimoniales (UP).
                    <br />
                    Les constats de chaque UP pourront ensuite être réunis dans un même rapport.
                  </>
                }
              />
            ) : null}
            {currentUpLabel ? (
              <Typography mb="16px" fontSize="14px" color={fr.colors.decisions.text.mention.grey.default}>
                Partie actuellement sélectionnée : {currentUpLabel}
              </Typography>
            ) : null}
            <Typography mb="24px">
              Pour quelle partie du monument <b>{monumentTitle}</b> souhaitez-vous réaliser un constat ?
            </Typography>
          </>
        ) : (
          <>
            <Box mb="16px" ml="-12px">
              <ModalBackButton onClick={() => setStack((s) => s.slice(0, -1))} />
            </Box>
            <Typography fontWeight="bold" mb="24px">
              {current.parent.intitule}
            </Typography>
          </>
        )}

        <Box component="fieldset" display="block" border="0" p="0" m="0" minWidth="0">
          <legend className="fr-sr-only">Partie du monument concernée par le constat</legend>
          <RadioRow
            name={groupName}
            id={`${groupName}-whole-${current.parent.id}`}
            label={isRoot ? "Ensemble du monument" : "Ensemble de l’UP"}
            checked={wholeChecked}
            onSelect={selectWhole}
          />

          <Typography mt="24px" mb="8px" color={fr.colors.decisions.text.mention.grey.default}>
            UP de niveau inférieur :
          </Typography>

          <Box component="ul" p="0" m="0" sx={{ listStyle: "none" }}>
            {current.enfants.map((up) => (
              <Box
                component="li"
                key={up.id}
                borderTop={`1px solid ${fr.colors.decisions.border.default.grey.default}`}
                sx={{
                  "&:last-of-type": { borderBottom: `1px solid ${fr.colors.decisions.border.default.grey.default}` },
                }}
              >
                <RadioRow
                  name={groupName}
                  id={`${groupName}-${up.id}`}
                  label={up.intitule}
                  checked={selectedValue === up.id}
                  onSelect={() => selectChild(up)}
                  onOpen={up.enfantsIds.length ? () => openChild(up) : undefined}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Flex
          justifyContent="flex-end"
          gap="16px"
          mt="32px"
          flexDirection={{ xs: "column-reverse", lg: "row" }}
          sx={{ button: { justifyContent: "center", width: { xs: "100%", lg: "auto" } } }}
        >
          <Button priority="secondary" type="button" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="button" disabled={!selected} onClick={confirm}>
            {confirmLabel}
          </Button>
        </Flex>
      </Box>
    </Dialog>
  );
};

const RadioRow = ({
  name,
  id,
  label,
  checked,
  onSelect,
  onOpen,
}: {
  name: string;
  id: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
  onOpen?: () => void;
}) => (
  <Flex alignItems="center" justifyContent="space-between" gap="8px" py="12px" width="100%">
    <div className="fr-radio-group" style={{ flex: 1 }}>
      <input type="radio" id={id} name={name} checked={checked} onChange={onSelect} />
      <label className="fr-label" htmlFor={id}>
        {label}
      </label>
    </div>
    {onOpen ? (
      <button
        type="button"
        className={fr.cx("fr-btn", "fr-btn--tertiary-no-outline", "fr-btn--sm", "fr-icon-arrow-right-s-line")}
        title={`Voir les UP de niveau inférieur de ${label}`}
        aria-label={`Voir les UP de niveau inférieur de ${label}`}
        onClick={onOpen}
      />
    ) : null}
  </Flex>
);
