import { useMutation } from "@tanstack/react-query";
import { db } from "../db/db";
import { type UseFormReturn, useWatch } from "react-hook-form";
import useDebounce from "react-use/lib/useDebounce";
import { Banner } from "./Banner";
import { useNavigate } from "@tanstack/react-router";
import Button from "@codegouvfr/react-dsfr/Button";
import { Center, Flex, styled } from "#styled-system/jsx";
import { fr } from "@codegouvfr/react-dsfr";
import { sva, cx, css } from "#styled-system/css";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Input from "@codegouvfr/react-dsfr/Input";
import { useIsFormDisabled } from "../features/DisabledContext";
import { Report } from "../db/AppSchema";
import { useAppStatus } from "../hooks/useAppStatus";

export function SyncFormBanner({ form, baseObject }: { form: UseFormReturn<Report>; baseObject: Record<string, any> }) {
  const newObject = useWatch({ control: form.control });

  const disabled = useIsFormDisabled();

  const diff = disabled ? {} : getDiff(newObject, baseObject);
  const syncMutation = useMutation(() => syncObject(baseObject.id, diff));

  useDebounce(() => syncMutation.mutate(), 500, [diff]);

  const navigate = useNavigate();
  const goBack = () => navigate({ to: "/" });

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.999999,
    initialIsIntersecting: true,
  });

  const isCollapsed = !isIntersecting;

  const styles = syncFormBanner({ isCollapsed });

  const status = useAppStatus();

  return (
    <>
      <Banner status={status} display="flex" flexDir="row" justifyContent="center" alignItems="center" w="100%">
        <Center w="calc((100% - 800px) / 2)">
          <styled.a
            className={"ri-arrow-left-line"}
            href={""}
            onClick={(e) => {
              e.preventDefault();

              goBack();
            }}
            hideBelow="lg"
            fontSize="16px"
            {...{
              "&::before": {
                width: "16px !important",
                height: "16px !important",
                mb: "4px !important",
                mr: "4px",
              },
            }}
          >
            Retour
          </styled.a>
        </Center>
        <Flex className={styles.root}>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            maxW={{ base: "100%", lg: "800px" }}
            h="100%"
          >
            {!isCollapsed ? (
              <styled.div hideFrom="lg">
                {/* @ts-ignore dsfr buttons props must have children */}
                <Button
                  className={styles.back}
                  priority="tertiary no outline"
                  iconId="ri-arrow-left-line"
                  onClick={() => goBack()}
                  size="large"
                />
              </styled.div>
            ) : null}
            {/* @ts-ignore dsfr buttons props must have children */}
            <styled.span nowrap>{isCollapsed ? newObject.title : "Titre compte-rendu :"}</styled.span>
          </Flex>
          <Input className={styles.input} label="" nativeInputProps={{ ...form.register("title") }} />
          <Status className={cx(styles.status, css({ hideFrom: "lg" }))} />
        </Flex>
        {/* <div></div> */}
        <styled.div w="calc((100% - 800px) / 2)"></styled.div>
      </Banner>
      <Banner ref={ref} status={status} zIndex="3" position="sticky" top="-1px">
        <Flex className={styles.collapsed}>
          {isCollapsed ? (
            <>
              {/* @ts-ignore dsfr buttons props must have children */}
              <Button
                className={styles.back}
                priority="tertiary no outline"
                iconId="ri-arrow-left-line"
                onClick={() => goBack()}
                size="large"
              />
              <styled.div nowrap>{newObject.title}</styled.div>
              <Status className={styles.status} />
            </>
          ) : null}
        </Flex>
      </Banner>
    </>
  );
}

export const Status = ({ className }: { status?: SyncFormStatus; className?: string }) => {
  const status = useAppStatus();

  return (
    <styled.div
      className={className}
      display="flex"
      borderRadius="4px"
      height="20px"
      px="6px"
      color="black"
      textTransform="uppercase"
      fontSize="sm"
      fontWeight="500"
      bgColor={messagesColor[status]}
    >
      <styled.span
        className={fr.cx("fr-icon-wifi-line")}
        aria-hidden={true}
        height="24px"
        {...{
          "&::before": {
            width: "16px !important",
            height: "16px !important",
            verticalAlign: "middle",
          },
        }}
        mr="6px"
      />
      {messages[status]}
    </styled.div>
  );
};

const syncFormBanner = sva({
  slots: ["root", "collapsed", "back", "label", "input", "status"],
  base: {
    root: {
      display: "flex",
      zIndex: 3,
      flexDirection: "column",
      justifyContent: "space-between",
      w: { base: "100%", lg: "800px" },
      py: { base: 0, lg: "56px" },
      px: "15px",
    },
    collapsed: {
      display: "flex",
      zIndex: 5,
      flexDirection: "row",
      justifyContent: "flex-end",
      w: "100%",
      maxW: { base: "unset", sm: "800px" },
      // h: { base: "56px", lg: "unset" },
      px: "15px",
    },
    back: {
      ml: "-10px",
      color: "black",
      _hover: { bgColor: "transparent" },
      "&::before": {
        width: "24px !important",
      },
    },
    label: {},
    input: {
      w: { base: "100%", lg: "100%" },
      // mt: "-5px !important",
      mb: "1em",
      "& input": {
        bgColor: "rgba(50, 50, 50, .15) !important",
      },
    },
    status: {
      alignSelf: "flex-end",
      mb: "16px",
      fontSize: "10px",
    },
  },
  variants: {
    isCollapsed: {
      true: {
        collapsed: {
          justifyContent: "space-between",
          alignItems: "center",
          h: { base: "56px", lg: "unset" },
        },
        status: {
          display: "flex",
          alignSelf: "initial",
          mb: "0",
        },
        back: {
          flex: "1 0 auto",
        },
      },
    },
  },
});

const messages: Record<SyncFormStatus, string> = {
  offline: "Hors ligne",
  pending: "En attente",
  saved: "Connecté(e)",
  saving: "Sauvegarde",
};

const messagesColor: Record<SyncFormStatus, string> = {
  offline: "red-offline",
  pending: "yellow-waiting",
  saved: "background-open-blue-france",
  saving: "background-open-blue-france",
};

export type SyncFormStatus = "offline" | "pending" | "saved" | "saving";

async function syncObject(id: string, diff: Record<string, any>) {
  if (!Object.keys(diff).length) return;

  console.log("saving", id, diff);

  await db.updateTable("report").where("id", "=", id).set(diff).execute();
}

function isPrimitive(value: any) {
  return value !== Object(value) || value instanceof Date;
}

export function getDiff(a: Record<string, any>, b: Record<string, any>) {
  const diff = Object.entries(a).reduce((acc, [key, value]) => {
    const oldValue = b[key];
    if (!isPrimitive(oldValue) || !isPrimitive(value)) return acc;

    const areDatesAndEqual =
      oldValue instanceof Date && value instanceof Date && oldValue.getTime() === value.getTime();

    if (oldValue !== value && !areDatesAndEqual) {
      acc[key] = value;
    }

    return acc;
  }, {} as any);

  return diff;
}
