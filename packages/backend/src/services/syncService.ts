import { Static, TSchema, Type } from "@sinclair/typebox";
import { db } from "../db/db";
import { makeDebug } from "../features/debug";
import { getServices } from "./services";
import { v4 } from "uuid";
import { DB, Delegation, PdfSnapshot, PictureLines } from "../db-types";
import { Awaitable } from "../types";
import { FastifyRequest } from "fastify";

const debug = makeDebug("sync-service");

const Nullable = <T extends TSchema>(schema: T) => Type.Optional(Type.Union([schema, Type.Null()]));

export class SyncService {
  async applyCrud(operation: Static<typeof crudTSchema>, user: FastifyRequest["user"]) {
    await db
      .insertInto("transactions")
      .values({
        id: v4(),
        entity_id: operation.id,
        type: operation.type,
        op_id: operation.op_id,
        tx_id: operation.tx_id,
        data: JSON.stringify(operation.data),
        op: operation.op,
        created_at: new Date(),
        user_id: user.id,
      })
      .execute();

    const hasPermission =
      await accessMap[operation.type as keyof AccessibleTables]?.[operation.op as keyof TablePermissions]?.();
    if (!hasPermission) return { success: false, error: "Unauthorized" };

    try {
      if (operation.op === "DELETE") {
        debug("Deleting row on table", operation.type, "with id", operation.id);
        const { type, id } = operation;
        await db
          .deleteFrom(type as any)
          .where("id", "=", id)
          .execute();
      }
      if (operation.op === "PATCH") {
        debug("Patching row on table", operation.type, "with id", operation.id);
        const { type, id, data } = operation;
        await db
          .updateTable(type as any)
          .set(data as any)
          .where("id", "=", id)
          .execute();
      }
      if (operation.op === "PUT") {
        debug("Inserting row on table", operation.type);
        const { type, data, id } = operation;
        await db
          .insertInto(type as any)
          .values({ id, ...data } as any)
          .execute();
      }

      if (operation.type === "picture_lines") {
        debug("updating picture lines");
        const pictureLines = await db.selectFrom("picture_lines").where("id", "=", operation.id).selectAll().execute();

        debug(pictureLines);
        const pictureId = pictureLines?.[0]?.pictureId;

        if (pictureId) await getServices().upload.handleNotifyPictureLines({ pictureId });
      }
    } catch (e) {
      debug("Error on applyCrud", e);

      return { success: false, error: e };
    }

    return { success: true };
  }
}

export const crudTSchema = Type.Object({
  op_id: Type.Number(),
  tx_id: Nullable(Type.Number()),
  id: Type.String(),
  type: Type.String(),
  op: Type.String(),
  data: Type.Optional(Type.Any()),
});

type PermissionPayload<TData extends any> = {
  operation: Omit<Static<typeof crudTSchema>, "data"> & { data: TData };
  user: FastifyRequest["user"];
};

type TablePermissions<T = any> = {
  PUT: (payload: PermissionPayload<T>) => Awaitable<boolean>;
  PATCH: (payload: PermissionPayload<Partial<T>>) => Awaitable<boolean>;
  DELETE: (payload: PermissionPayload<{}>) => Awaitable<boolean>;
};

type AccessibleTables = Omit<DB, "clause" | "internal_user" | "tmp_pictures">;

const isSameUdap = ({ operation, user }: PermissionPayload) => operation.data?.udap_id === user.user?.udap_id;
const isPictureLinesOwner = async ({ operation, user }: PermissionPayload) => {
  const reportsQuery = await db
    .selectFrom("pictures")
    .where("id", "=", (operation.data as PictureLines).pictureId)
    .innerJoin("report", "report.id", "pictures.reportId")
    .select(["report.createdBy as createdBy"])
    .execute();
  const createdBy = reportsQuery?.[0]?.createdBy;

  return createdBy === user.id;
};
export const accessMap: Record<keyof AccessibleTables, TablePermissions> = {
  clause_v2: {
    PUT: isSameUdap,
    PATCH: isSameUdap,
    DELETE: isSameUdap,
  },
  delegation: {
    PUT: ({ operation, user }) => (operation.data as Delegation).createdBy === user.id,
    PATCH: ({ operation, user }) => (operation.data as Delegation).createdBy === user.id,
    DELETE: ({ operation, user }) => (operation.data as Delegation).createdBy === user.id,
  },
  pdf_snapshot: {
    PUT: ({ operation, user }) => (operation.data as PdfSnapshot).user_id === user.id,
    PATCH: ({ operation, user }) => (operation.data as PdfSnapshot).user_id === user.id,
    DELETE: ({ operation, user }) => (operation.data as PdfSnapshot).user_id === user.id,
  },
  picture_lines: {
    PUT: isPictureLinesOwner,
    PATCH: isPictureLinesOwner,
    DELETE: isPictureLinesOwner,
  },
  pictures: {
    PUT: () => true,
    PATCH: () => true,
    DELETE: () => true,
  },
  report: {
    PUT: () => true,
    PATCH: () => true,
    DELETE: () => true,
  },
  service_instructeurs: {
    PUT: () => true,
    PATCH: () => true,
    DELETE: () => true,
  },
  transactions: {
    PUT: () => true,
    PATCH: () => true,
    DELETE: () => true,
  },
  udap: {
    PUT: () => true,
    PATCH: () => true,
    DELETE: () => true,
  },
  user: {
    PUT: () => true,
    PATCH: () => true,
    DELETE: () => true,
  },
  whitelist: {
    PUT: () => true,
    PATCH: () => true,
    DELETE: () => true,
  },
};
