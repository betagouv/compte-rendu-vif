import { db } from "../db/db";

export class StaticDataService {
  async getUDAPs() {
    return db.selectFrom("udap").where("visible", "=", true).orderBy("dept_number asc").selectAll().execute();
  }
}
