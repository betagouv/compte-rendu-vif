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

    const deptNumber = service[0].dept_numbers?.split(",")[0];

    await db.deleteFrom("user_dept").where("user_id", "=", userId).execute();
    if (deptNumber) await db.insertInto("user_dept").values({ user_id: userId, dept_number: deptNumber }).execute();

    return { message: "Le service a été changé avec succès" };
  }
}
