import { db } from "../db/db";

import { makeDebug } from "../features/debug";
import { AppError } from "../features/errors";

const debug = makeDebug("user_service");
export class UserService {
  async changeService(userId: string, serviceId: string) {
    debug("Changing service for user", userId, "to", serviceId);
    const service = await db.selectFrom("service").where("id", "=", serviceId).selectAll().execute();
    if (!service[0]) {
      throw new AppError(400, "Le service n'existe pas");
    }

    await db.updateTable("user").set({ service_id: serviceId }).where("id", "=", userId).execute();

    return { message: "Le service a été changé avec succès" };
  }
}
