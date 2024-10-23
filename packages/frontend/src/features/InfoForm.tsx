import { InputGroup, InputGroupWithTitle } from "#components/InputGroup";
import { SpaceTypeChips } from "#components/chips/SpaceTypeChips";
import { css, cx } from "#styled-system/css";
import { Box, Center, Divider, Flex, Grid, Stack, styled } from "#styled-system/jsx";
import { useTabsContext } from "@ark-ui/react/tabs";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import Select from "@codegouvfr/react-dsfr/Select";
import type { Pictures, Report, Tmp_pictures } from "@cr-vif/electric-client/frontend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useLiveQuery } from "electric-sql/react";
import { get, set } from "idb-keyval";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { useUser } from "../contexts/AuthContext";
import { db } from "../db";
import { useIsFormDisabled } from "./DisabledContext";
import { ServiceInstructeurSelect } from "./ServiceInstructeurSelect";
import { deleteImageFromIdb, getPicturesStore, getToUploadStore, getUploadStatusStore, syncImages } from "./idb";
import Badge from "@codegouvfr/react-dsfr/Badge";

export const InfoForm = () => {
  const form = useFormContext<Report>();
  const user = useUser()!;

  const isFormDisabled = useIsFormDisabled();

  const meetDate = useWatch({ control: form.control, name: "meetDate" });
  const meetDateRef = useRef({
    day: meetDate ? format(new Date(meetDate), "yyyy-MM-dd") : "",
    time: meetDate ? format(new Date(meetDate), "HH:mm") : "",
  });

  const redactedById = useWatch({ control: form.control, name: "redactedById" });

  const tryToSetMeetDate = () => {
    const day = meetDateRef.current.day;
    const time = meetDateRef.current.time;

    const date = parse(`${day}T${time}`, "yyyy-MM-dd'T'HH:mm", new Date());
    if (!day || !time || Number.isNaN(date.getTime())) {
      form.setValue("meetDate", undefined as any);
      return;
    }

    form.setValue("meetDate", date.toISOString() as any);
  };

  const setTime = (e: any) => {
    meetDateRef.current.time = e.target.value;
    tryToSetMeetDate();
  };

  const setDay = (e: any) => {
    meetDateRef.current.day = e.target.value;
    tryToSetMeetDate();
  };

  const redactedByQuery = useLiveQuery(
    db.delegation.liveMany({ where: { delegatedTo: user.id }, include: { user_delegation_createdByTouser: true } }),
  );

  const redactedByOptions: { value: string; label: string }[] = [
    {
      value: user.id,
      label: user.name,
    },
    ...(redactedByQuery.results?.map((delegation) => ({
      value: (delegation as any).user_delegation_createdByTouser?.id,
      label: (delegation as any).user_delegation_createdByTouser?.name,
    })) ?? []),
  ];

  const tab = useTabsContext();

  const baseRedactedByProps = form.register("redactedById");
  const redactedByProps = {
    ...baseRedactedByProps,
    onChange: (e: any) => {
      const option = redactedByOptions.find((option) => option.value === e.target.value);

      baseRedactedByProps.onChange(e);
      form.setValue("redactedBy", option?.label ?? null);
    },
  };

  return (
    <Flex direction="column" w="100%" padding="16px">
      {/* <Badge severity="info">Les champs marqués d'un astérisque (*) sont obligatoires</Badge> */}
      <InputGroupWithTitle title="Le rendez-vous">
        <Stack gap={{ base: "0", lg: "16px" }} direction={{ base: "column", lg: "row" }}>
          <Select
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "24px", lg: "16px" } })}
            label="Rédigé par"
            disabled={isFormDisabled}
            nativeSelectProps={redactedByProps}
          >
            {redactedByOptions?.map((option) => (
              <option key={option.value} value={option.value} selected={redactedById === option.value}>
                {option.label}
              </option>
            )) ?? null}
          </Select>
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "16px", lg: "16px" } })}
            disabled={isFormDisabled}
            label="Nom du demandeur"
            nativeInputProps={form.register("applicantName")}
          />
        </Stack>

        <styled.div mt="8px">
          <Input
            className={css({})}
            disabled={isFormDisabled}
            label="Courriel demandeur"
            nativeInputProps={form.register("applicantEmail")}
          />
        </styled.div>

        <Stack direction="row" mt="24px">
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "16px", lg: undefined } })}
            disabled={isFormDisabled}
            label="Date"
            nativeInputProps={{ type: "date", onChange: setDay, value: meetDateRef.current.day }}
          />
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "16px", lg: undefined } })}
            disabled={isFormDisabled}
            label="Horaire"
            nativeInputProps={{ type: "time", onChange: setTime, value: meetDateRef.current.time }}
          />
        </Stack>
      </InputGroupWithTitle>

      <Divider mt="20px" mb="52px" />

      <InputGroupWithTitle title="Le projet">
        <UploadImage reportId={form.getValues().id} />

        <Input
          className={css({ mb: { base: "24px", lg: undefined } })}
          label="Description"
          disabled={isFormDisabled}
          textArea
          nativeTextAreaProps={{ ...form.register("projectDescription"), rows: 5 }}
        />

        <Input
          className={css({ flex: { base: "none", lg: 2 }, mt: "16px", mb: { base: "24px", lg: undefined } })}
          disabled={isFormDisabled}
          label="Adresse"
          nativeInputProps={form.register("applicantAddress")}
        />
        <Stack gap={{ base: "0", lg: "16px" }} direction={{ base: "column", lg: "row" }}>
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "24px", lg: undefined } })}
            disabled={isFormDisabled}
            label="Code postal"
            // hintText="Ce champ apparaitra dans la liste des compte-rendus"
            nativeInputProps={form.register("zipCode")}
          />
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: { base: "24px", lg: undefined } })}
            disabled={isFormDisabled}
            label="Commune"
            // hintText="Ce champ apparaitra dans la liste des compte-rendus"
            nativeInputProps={form.register("city")}
          />
        </Stack>
        <Stack gap={{ base: "0", lg: "16px" }} direction={{ base: "column", lg: "row" }}>
          <Input
            className={css({ flex: { base: "none", lg: 1 }, mb: "24px" })}
            disabled={isFormDisabled}
            label="Référence cadastrale"
            nativeInputProps={{ ...form.register("projectCadastralRef"), placeholder: "Seulement la principale" }}
          />
          <Box
            className={css({
              flex: {
                base: "none",
                lg: 1,
              },
            })}
          >
            <ServiceInstructeurSelect disabled={isFormDisabled} />
          </Box>
        </Stack>
        <SpaceTypeChips className={css({ flex: { base: "none", lg: 1 } })} disabled={isFormDisabled} />
      </InputGroupWithTitle>

      <Center justifyContent={{ base: "center", lg: "flex-start" }} mt={{ base: "80px", lg: "50px" }} mb="120px">
        <Button
          type="button"
          iconId="ri-arrow-right-line"
          nativeButtonProps={{
            type: "button",
            onClick: () => {
              tab.setValue("notes");
            },
          }}
        >
          Rédiger le bilan
        </Button>
      </Center>
    </Flex>
  );
};
const broadcastChannel = new BroadcastChannel("sw-messages");

const UploadImage = ({ reportId }: { reportId: string }) => {
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const ref = useRef<HTMLInputElement>(null);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const picturesStore = getPicturesStore();
    const toUploadStore = getToUploadStore();

    const id = v4();
    const file = e.target.files?.[0];
    if (!file) return;

    const buffer = await getArrayBufferFromBlob(file);
    await set(id, buffer, picturesStore);
    await set(id, reportId, toUploadStore);

    await db.tmp_pictures.create({ data: { id, reportId, createdAt: new Date() } });
    syncImages();
  };

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      console.log("message", event.data);
      if (event.data.type === "status") {
        console.log("status", event.data.id, event.data.status);
        setStatusMap((prev) => ({ ...prev, [event.data.id]: event.data.status }));
      }
    };

    broadcastChannel.addEventListener("message", listener);

    return () => broadcastChannel.removeEventListener("message", listener);
  }, []);

  return (
    <>
      <Button
        type="button"
        iconId="ri-add-line"
        priority="secondary"
        nativeButtonProps={{
          type: "button",
          onClick: () => ref.current?.click(),
        }}
      >
        Ajouter photo
      </Button>
      <styled.input ref={ref as any} type="file" accept="image/*" onChange={onChange} display="none" />
      <ReportPictures statusMap={statusMap} />
    </>
  );
};

const ReportStatus = ({ status }: { status: "uploading" | "success" | "error" }) => {
  const { color, bgColor, label, icon } = statusData[status];

  return (
    <Badge
      className={css({ display: "flex", alignItems: "center" })}
      severity={"info"}
      noIcon
      small
      style={{
        backgroundColor: bgColor,
        color,
        // backgroundColor: colors[status][1],
        // color: colors[status][0],
      }}
    >
      <styled.span
        className={cx(
          icon,
          css({ "&::before": { w: "12px !important", h: "12px !important", verticalAlign: "middle !important" } }),
        )}
      />
      <styled.span ml="4px">{label}</styled.span>
    </Badge>
  );
};

const statusData = {
  uploading: { label: "En cours", bgColor: "#FEE7FC", color: "#855080", icon: "fr-icon-refresh-line" },
  success: { label: "Ok", bgColor: "#B8FEC9", color: "#18753C", icon: "fr-icon-success-line" },
  error: { label: "Erreur", bgColor: "#FEC9C9", color: "#853C3C", icon: "fr-icon-warning-line" },
};

const ReportPictures = ({ statusMap }: { statusMap: Record<string, string> }) => {
  const form = useFormContext<Report>();

  const reportId = form.getValues().id;

  const tmpPicturesQuery = useLiveQuery(
    db.tmp_pictures.liveMany({ where: { reportId }, orderBy: { createdAt: "desc" } }),
  );

  const picturesQuery = useLiveQuery(
    db.pictures.liveMany({
      where: { reportId },
      orderBy: { createdAt: "desc" },
    }),
  );

  const pictures = mergePictureArrays(tmpPicturesQuery.results ?? [], picturesQuery.results ?? []);

  return (
    <Flex direction="column" w="100%" my="40px">
      <InputGroup>
        {/* <Flex gap="16px" direction="column"> */}
        <Grid gap="16px" gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}>
          {pictures?.map((picture, index) => (
            <PictureThumbnail key={picture.id} picture={picture as any} index={index} status={statusMap[picture.id]} />
          ))}
        </Grid>
        {/* </Flex> */}
      </InputGroup>
    </Flex>
  );
};

const mergePictureArrays = (a: Tmp_pictures[], b: Pictures[]) => {
  const map = new Map<string, Tmp_pictures>();

  const sortByDate = (a: Tmp_pictures, b: Tmp_pictures) => {
    return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
  };

  for (const item of a) {
    map.set(item.id, item);
  }

  for (const item of b) {
    map.set(item.id, item);
  }

  return Array.from(map.values()).sort(sortByDate);
};

const PictureThumbnail = ({ picture, index, status }: { picture: Pictures; index: number; status?: string }) => {
  const deletePictureMutation = useMutation(async () => {
    await deleteImageFromIdb(picture.id);
    await db.tmp_pictures.delete({ where: { id: picture.id } }).catch(() => {});
    await db.pictures.delete({ where: { id: picture.id } }).catch(() => {});

    return "ok";
  });

  const bgUrlQuery = useQuery({
    queryKey: ["picture", picture.id, picture.url],
    queryFn: async () => {
      const buffer = await get(picture.id, getPicturesStore());
      if (!buffer) return picture.url;

      const blob = new Blob([buffer], { type: "image/png" });

      return URL.createObjectURL(blob);
    },
    refetchOnWindowFocus: false,
  });

  const idbStatusQuery = useQuery({
    queryKey: ["picture-status", picture.id],
    queryFn: async () => {
      const status = await get(picture.id, getUploadStatusStore());
      return status ?? null;
    },
    enabled: !status,
  });

  const finalStatus = picture.url ? "success" : status ?? idbStatusQuery.data ?? "uploading";

  const bgUrl = bgUrlQuery.data;

  return (
    <Stack>
      {/* <Badge severity={finalStatus === "uploading" ? }></Badge> */}
      <ReportStatus status={finalStatus as any} />
      <Flex
        style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : { backgroundColor: "gray" }}
        flexDir="column"
        justifyContent="flex-end"
        w="180px"
        h="170px"
        backgroundPositionY="-20px"
        backgroundSize="cover"
      >
        <Flex alignItems="center" border="1px solid #DFDFDF" h="40px" bgColor="white">
          <Box flex="1" pl="5px">
            N° {index + 1}
          </Box>
          <Box onClick={() => deletePictureMutation.mutate()} borderLeft="1px solid #DFDFDF">
            <Button type="button" iconId="ri-close-circle-fill" priority="tertiary no outline" />
            {/* {finalStatus ? <span>{finalStatus}</span> : null} */}
            {/* <styled.i className={fr.cx("fr-icon--md", "fr-icon-close-circle-fill")} /> */}
          </Box>
        </Flex>
      </Flex>
    </Stack>
  );
};

async function getArrayBufferFromBlob(blob: Blob) {
  return new Promise<ArrayBuffer>((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as ArrayBuffer);
    reader.readAsArrayBuffer(blob);
  });
}
