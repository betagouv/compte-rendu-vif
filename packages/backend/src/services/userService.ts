import { db } from "../db/db";

import { makeDebug } from "../features/debug";
import { AppError } from "../features/errors";

const debug = makeDebug("user_service");
export class UserService {
  async changeUdap(userId: string, udapId: string) {
    debug("Changing udap for user", userId, "to", udapId);
    const udap = await db.selectFrom("udap").where("id", "=", udapId).selectAll().execute();
    if (!udap[0]) {
      throw new AppError(400, "L'udap n'existe pas");
    }

    await db.updateTable("user").set({ udap_id: udapId }).where("id", "=", userId).execute();

    return { message: "L'udap a été changé avec succès" };
  }
}
