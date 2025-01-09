import { useUser } from "../../contexts/AuthContext";
import { ServiceInstructeurs } from "../../db/AppSchema";
import { db, useDbQuery } from "../../db/db";
import { Divider, Flex, styled } from "#styled-system/jsx";
import Input from "@codegouvfr/react-dsfr/Input";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Spinner } from "#components/Spinner.tsx";
import { MenuTitle } from "./MenuTitle";
import Button from "@codegouvfr/react-dsfr/Button";
import { css, cx } from "#styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import { useMutation } from "@tanstack/react-query";
import { transformBold } from "./ClauseMenu";
import { v4 } from "uuid";

type MenuMode = "view" | "add" | "edit";

export const ServicesMenu = () => {
  const user = useUser()!;
  const services = useDbQuery(
    db.selectFrom("service_instructeurs").where("udap_id", "=", user.udap_id).orderBy("short_name asc").selectAll(),
  );

  const [mode, setMode] = useState<MenuMode>("view");

  const [bannerProps, setBannerProps] = useState<BannerProps | null>(null);

  const createServiceMutation = useMutation(async (service: ServiceInstructeurs) => {
    await db
      .insertInto("service_instructeurs")
      .values({ ...service, id: v4(), udap_id: user.udap_id })
      .execute();

    setBannerProps({
      status: "success",
      icon: fr.cx("ri-check-fill"),
      text: `Service ajouté`,
    });
    setMode("view");
  });

  const editServicesMutation = useMutation(async (newServices: ServiceInstructeurs[]) => {
    const { updatedServices } = getDiff(services!.data, newServices);

    for (const service of updatedServices) {
      await db.updateTable("service_instructeurs").set(service).where("id", "=", service.id).execute();
    }

    setBannerProps({
      status: "success",
      icon: fr.cx("ri-check-fill"),
      text: `Modifications enregistrées`,
    });
    setMode("view");
  });

  if (services.isLoading) {
    return (
      <styled.div h="100%">
        <Spinner />
      </styled.div>
    );
  }

  const isEditing = mode === "edit";
  const isAdding = mode === "add";

  const buttons =
    isEditing || isAdding ? (
      <>
        <Button
          className={css({
            "&::before": {
              ml: "0 !important",
              mr: { base: "0 !important", lg: "8px !important" },
            },
          })}
          disabled={editServicesMutation.isLoading}
          iconId="ri-save-fill"
          priority="primary"
          type="submit"
          nativeButtonProps={{
            form: isEditing ? "edit-form" : "add-form",
          }}
        >
          <styled.span hideBelow="lg">Enregistrer</styled.span>
        </Button>
      </>
    ) : (
      <>
        <Button
          className={css({
            "&::before": {
              ml: "0 !important",
              mr: { base: "0 !important", lg: "8px !important" },
            },
          })}
          nativeButtonProps={{ type: "button" }}
          iconId="ri-pencil-fill"
          priority="secondary"
          onClick={(e) => {
            e.preventDefault();
            setBannerProps({
              status: "idle" as BannerStatus,
              icon: fr.cx("fr-icon-alert-fill"),
              text: "**Vous modifiez les services pour toute l’UDAP.**",
            });
            setMode("edit");
          }}
        >
          <styled.span hideBelow="lg">Modifier</styled.span>
        </Button>
        <Button
          className={css({
            "&::before": {
              ml: "0 !important",
              mr: { base: "0 !important", lg: "8px !important" },
            },
          })}
          nativeButtonProps={{ type: "button" }}
          iconId="ri-add-fill"
          priority="secondary"
          onClick={(e) => {
            e.preventDefault();
            setBannerProps({
              status: "idle" as BannerStatus,
              icon: fr.cx("fr-icon-alert-fill"),
              text: "**Vous ajoutez un service pour toute l’UDAP.**",
            });
            setMode("add");
          }}
        >
          <styled.span hideBelow="lg">Ajouter</styled.span>
        </Button>
      </>
    );

  return (
    <Flex flexDir="column" h="100%">
      <MenuTitle buttons={buttons} alert={bannerProps ? <ServiceFormBanner {...bannerProps} /> : null}>
        <styled.div pl={{ base: "8px", lg: "0" }}>Services instructeurs et urbanistes</styled.div>
      </MenuTitle>

      <Flex gap="80px" flexDir="column" px={{ base: "8px", lg: "32px" }} pb="40px">
        {isAdding ? <ServiceAdd addService={createServiceMutation.mutate} /> : null}
        <ServicesList services={services.data} mode={mode} editServices={editServicesMutation.mutate} />
      </Flex>
    </Flex>
  );
};

type BannerProps = {
  text: string;
  icon: string;
  status: BannerStatus;
};

type BannerStatus = "idle" | "success";

const ServiceFormBanner = ({ status, icon, text }: BannerProps) => {
  const bgColor = status === "idle" ? "#E8EDFF" : "#B8FEC9";
  const iconColor = status === "idle" ? "#0063CB" : "#18753C";

  return (
    <Flex mb="24px" py="16px" px="32px" bgColor={bgColor}>
      <i className={cx(icon, css({ color: iconColor }))} />
      <styled.div
        dangerouslySetInnerHTML={{ __html: transformBold(text) }}
        ml="16px"
        pr="24px"
        color={iconColor}
      ></styled.div>
    </Flex>
  );
};

const ServicesList = ({
  services,
  mode,
  editServices,
}: {
  services: ServiceInstructeurs[];
  mode: MenuMode;
  editServices: (services: ServiceInstructeurs[]) => any;
}) => {
  const form = useForm<{ services: ServiceInstructeurs[] }>({
    defaultValues: {
      services,
    },
  });

  const { fields, remove } = useFieldArray({ control: form.control, name: "services" });

  const deleteServiceMutation = useMutation(async (id: string) => {
    await db.deleteFrom("service_instructeurs").where("id", "=", id).execute();
    remove(fields.findIndex((field) => field.id === id));
  });

  useEffect(() => {
    form.reset({ services });
  }, [mode]);

  const isEditing = mode === "edit";
  return (
    <styled.form
      onSubmit={form.handleSubmit((data) => isEditing && editServices(data.services))}
      id="edit-form"
      h="100%"
    >
      <Flex gap="24px" flexDir="column" h="100%">
        {isEditing
          ? fields.map((field, index) => (
              <ServiceForm
                dividerBelow={index < fields.length - 1}
                key={field.id}
                name={`services[${index}]`}
                form={form}
                deleteService={deleteServiceMutation.mutate}
              />
            ))
          : services.map((service) => <Service key={service.id} service={service} />)}
      </Flex>
    </styled.form>
  );
};

const getDiff = (baseServices: ServiceInstructeurs[], modifiedServices: ServiceInstructeurs[]) => {
  const updatedServices = modifiedServices.filter((c) => {
    const baseService = baseServices.find((bc) => bc.id === c.id);
    return (
      baseService &&
      (baseService.full_name !== c.full_name ||
        baseService.short_name !== c.short_name ||
        baseService.email !== c.email ||
        baseService.tel !== c.tel)
    );
  });

  return { updatedServices };
};

const ServiceAdd = ({ addService }: { addService: (service: ServiceInstructeurs) => any }) => {
  const form = useForm<ServiceInstructeurs>({
    defaultValues: {
      full_name: "",
      short_name: "",
      email: "",
      tel: "",
    },
  });

  return (
    <styled.form onSubmit={form.handleSubmit((data) => addService(data))} id="add-form">
      <Flex>
        <ServiceForm form={form} dividerBelow />
      </Flex>
    </styled.form>
  );
};

const ServiceForm = ({
  name,
  form,
  dividerBelow,
  deleteService,
}: {
  name?: string;
  form: any;
  dividerBelow?: boolean;
  deleteService?: (id: string) => any;
}) => {
  const prefix = name ? `${name}.` : "";

  return (
    <Flex flexDir="column" w="100%" h="100%">
      <Input
        className={css({ flex: 1 })}
        label="Intitulé complet"
        nativeInputProps={form.register(`${prefix}full_name`, { required: true })}
      />
      <Flex gap={{ base: "8px", lg: "20px" }}>
        <Input
          className={css({ flex: 1 })}
          label="Abréviation"
          nativeInputProps={form.register(`${prefix}short_name`, { required: true })}
        />
        <Input className={css({ flex: 1 })} label="Téléphone" nativeInputProps={form.register(`${prefix}tel`)} />
      </Flex>

      <Flex>
        <Input className={css({ flex: 1 })} label="Courriel" nativeInputProps={form.register(`${prefix}email`)} />
      </Flex>

      {deleteService ? (
        <Flex justifyContent="flex-end" my={{ base: "24px", lg: "40px" }}>
          <Button
            iconId="ri-delete-bin-fill"
            iconPosition="right"
            priority="tertiary"
            nativeButtonProps={{ type: "button" }}
            onClick={() => deleteService(form.watch(`${prefix}id`))}
          >
            Supprimer
          </Button>
        </Flex>
      ) : null}
      {dividerBelow ? <Divider /> : null}
    </Flex>
  );
};

const Service = ({ service }: { service: ServiceInstructeurs }) => {
  return (
    <Flex flexDir="column">
      <styled.div color="text-title-blue-france" fontWeight="bold">
        {service.short_name}
      </styled.div>
      <styled.div>
        <styled.span fontWeight="bold">{service.full_name}</styled.span>
        {" : "}
        <styled.span>{service.email}</styled.span>
        {", "}
        <styled.span nowrap>{service.tel}</styled.span>
      </styled.div>
    </Flex>
  );
};
