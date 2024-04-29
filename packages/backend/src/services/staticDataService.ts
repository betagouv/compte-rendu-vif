import { db } from "../db/db";

export class StaticDataService {
  async getUDAPs() {
    return db.udap.findMany({ where: { visible: true } });
  }
}
