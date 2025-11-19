import { db } from "../db/db";

export class StateReportService {
  async getImagesForObjets(references: string[]) {
    return db.selectFrom("pop_images").where("reference", "in", references).selectAll().execute();
  }
}
