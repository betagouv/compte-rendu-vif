import { Static, TSchema, Type } from "@sinclair/typebox";
import { db } from "../db/db";
import { makeDebug } from "../features/debug";
import { getServices } from "./services";

const debug = makeDebug("sync-service");

const Nullable = <T extends TSchema>(schema: T) => Type.Optional(Type.Union([schema, Type.Null()]));

export class SyncService {
  async applyCrud(operation: Static<typeof crudTSchema>) {
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

    return { success: true };
  }

  // async uploadPictures(operation: Static<typeof pictureTSchema>) {}
}

export const crudTSchema = Type.Object({
  op_id: Type.Number(),
  tx_id: Nullable(Type.Number()),

  id: Type.String(),
  type: Type.String(),
  op: Type.String(),
  data: Type.Optional(Type.Any()),
});
