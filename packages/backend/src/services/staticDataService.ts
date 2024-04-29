import { db } from "../db/db";

export class StaticDataService {
  async getUDAPs() {
    return db.udaps.findMany({ where: { visible: true } });
  }
}
