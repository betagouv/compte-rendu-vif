import { db } from "../db/db";

export class StaticDataService {
  async getServices() {
    return db.selectFrom("service").where("visible", "=", true).orderBy("dept_numbers asc").selectAll().execute();
  }
}
