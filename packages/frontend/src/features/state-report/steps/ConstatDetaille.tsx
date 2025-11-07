import { Box, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import { db, useDbQuery } from "../../../db/db";
import { getRouteApi } from "@tanstack/react-router";
import { Badge, Button, Input, Tile } from "#components/MUIDsfr.tsx";
import { VisitedSection } from "../../../db/AppSchema";
import { Flex } from "#components/ui/Flex.tsx";
import { ModalCloseButton } from "../../menu/MenuTitle";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../../../contexts/AuthContext";
import { v4 } from "uuid";
import { EtatGeneralRadioButtons } from "./ConstatGeneral";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import useDebounce from "react-use/lib/useDebounce";
import { getDiff } from "#components/SyncForm.tsx";
import { FullWidthButton } from "#components/FullWidthButton.tsx";

const routeApi = getRouteApi("/constat/$constatId");
export const ConstatDetaille = () => {
  const { constatId } = routeApi.useParams();
  const sectionsQuery = useDbQuery(
    db.selectFrom("visited_section").selectAll().where("state_report_id", "=", constatId),
  );

  return (
    <Stack px="16px" pt="16px" mb="16px">
      <Typography fontSize="14px" mb="16px">
        Renseignez vos observations pour chaque partie visitée. À défaut, chacune sera notée comme non-visitée.
      </Typography>

      <SectionsList visitedSections={sectionsQuery.data} />
    </Stack>
  );
};

const SectionsList = ({ visitedSections }: { visitedSections: VisitedSection[] }) => {
  const [selectedSectionId, setSelectedSectionId] = useState<VisitedSection["id"] | null>(null);
  const user = useUser();
  const constatId = routeApi.useParams().constatId;

  const selectSectionMutation = useMutation({
    mutationFn: async (section: string) => {
      const existing = visitedSections?.find((vs) => vs.section === section);
      if (existing) {
        setSelectedSectionId(existing.id);
        return;
      }
      const newSection = await db
        .insertInto("visited_section")
        .values({
          id: v4(),
          state_report_id: constatId,
          section,
          etat_general: "",
          proportion_dans_cet_etat: "",
          commentaires: "",
          service_id: user!.service_id,
        })
        .returningAll()
        .execute();
      if (!newSection[0]) return;
      setSelectedSectionId(newSection[0].id);
    },
  });

  const selectedSection = visitedSections?.find((vs) => vs.id === selectedSectionId) || null;

  return (
    <Stack gap="8px">
      <SectionModal selectedSection={selectedSection} onClose={() => setSelectedSectionId(null)} />
      {defaultSections.map((section) => {
        const visited = visitedSections?.find((vs) => vs.section === section);
        const isVisited = visited && !!visited.etat_general;
        return (
          <SectionItem
            key={section}
            isVisited={isVisited}
            section={section}
            onClick={() => {
              selectSectionMutation.mutate(section);
            }}
          />
        );
      })}
    </Stack>
  );
};

const SectionItem = ({
  section,
  isVisited,
  onClick,
}: {
  section: string;
  isVisited?: boolean;
  onClick: (section: string) => void;
}) => {
  return (
    <Tile
      title={
        <Flex alignItems="center" flexDirection="column">
          {isVisited ? (
            <Badge severity="success" sx={{ mb: "8px" }}>
              Renseigné
            </Badge>
          ) : null}
          <Box>{section}</Box>
        </Flex>
      }
      buttonProps={{
        onClick: () => onClick(section),
      }}
      noIcon
      sx={{
        py: isVisited ? "16px" : undefined,
      }}
    />
  );
};

const defaultSections = [
  "Fondations, sols, sous-sols",
  "Maçonnerie, structure",
  "Parements, enduits",
  "Menuiserie, métallerie, vitraux",
  "Cloisonnement, revêtements, décors, objets, mobiliers",
  "Équipements, sécurité, accessibilité",
  "Environnements, abords, voirie et réseaux",
];

const SectionModal = ({
  selectedSection,
  onClose,
}: {
  selectedSection: VisitedSection | null;
  onClose: () => void;
}) => {
  return (
    <Dialog
      open={selectedSection !== null}
      sx={{
        ".MuiPaper-root": {
          overflowY: "visible",
          maxHeight: { xs: "unset", lg: "calc(100% - 64px)" },
          maxWidth: { xs: "unset", lg: "576px" },
          width: { xs: "100%", lg: "926px" },
          height: { xs: "100%", lg: "unset" },
          margin: { xs: "0", lg: undefined },
        },
      }}
    >
      <Box p={{ xs: "16px" }}>
        <Flex>
          <DialogTitle
            flex="1"
            sx={{
              paddingLeft: "16px",
            }}
          >
            {selectedSection?.section}
          </DialogTitle>
          <ModalCloseButton onClose={onClose} />
        </Flex>

        {selectedSection ? (
          <Stack gap="16px" px={{ xs: "0", lg: "16px" }}>
            <SectionForm visitedSection={selectedSection} />
            <FullWidthButton onClick={() => onClose()}>Enregistrer</FullWidthButton>
          </Stack>
        ) : null}
      </Box>
    </Dialog>
  );
};

const SectionForm = ({ visitedSection }: { visitedSection: VisitedSection }) => {
  const [values, setValues] = useState(visitedSection);

  const syncMutation = useMutation({
    mutationFn: async () => {
      if (Object.keys(diff).length === 0) {
        return;
      }

      await db
        .updateTable("visited_section")
        .set({
          etat_general: values.etat_general,
          proportion_dans_cet_etat: values.proportion_dans_cet_etat,
          commentaires: values.commentaires,
        })
        .where("id", "=", visitedSection.id)
        .returningAll()
        .execute();
    },
  });

  const diff = getDiff(visitedSection, values);
  useDebounce(() => syncMutation.mutate(), 500, [diff]);

  return (
    <Stack>
      <SectionEtatGeneralRadioButtons
        section={values}
        onChange={(label) => setValues({ ...values, etat_general: label })}
      />
      <SectionProportionsRadioButtons
        section={values}
        onChange={(label) => setValues({ ...values, proportion_dans_cet_etat: label })}
      />
      <Input
        textArea
        label="Commentaires"
        nativeTextAreaProps={{
          rows: 6,
          value: values.commentaires ?? "",
          onChange: (e) => setValues({ ...values, commentaires: e.target.value }),
        }}
      />
    </Stack>
  );
};

const SectionEtatGeneralRadioButtons = ({
  section,
  onChange,
}: {
  section: VisitedSection;
  onChange: (label: string) => void;
}) => {
  const options = ["Bon", "Moyen", "Mauvais", "Péril"].map((label) => ({
    label,
    nativeInputProps: {
      checked: section.etat_general === label,
      onChange: () => onChange(label),
    },
  }));

  return <RadioButtons legend="État général" options={options} />;
};

const SectionProportionsRadioButtons = ({
  section,
  onChange,
}: {
  section: VisitedSection;
  onChange: (label: string) => void;
}) => {
  const options = ["50%", "60%", "70%", "80%", "90%", "100%"].map((label) => ({
    label,
    nativeInputProps: {
      checked: section.proportion_dans_cet_etat === label,
      onChange: () => onChange(label),
    },
  }));

  return <RadioButtons legend="Proportion dans cet état" options={options} />;
};
