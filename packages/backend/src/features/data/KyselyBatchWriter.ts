import { Writable } from "stream";
import { db } from "../../db/db";
import { makeDebug } from "../debug";
import { pick } from "pastable";

const debug = makeDebug("batch-writer");

export class KyselyBatchWriter<RowType> extends Writable {
  private batch: RowType[];

  constructor(
    public tableName: string,
    public batchSize = 1000,
    public primaryKeyColumn: keyof RowType,
  ) {
    super({ objectMode: true });
    this.batch = [];
  }

  async _write(
    row: RowType,
    encoding: BufferEncoding,
    callback: ((error: Error | null | undefined) => void) | undefined,
  ) {
    this.batch.push({ ...row, id: row[this.primaryKeyColumn] });

    if (this.batch.length >= this.batchSize) {
      await this.flush();
    }
    callback?.(null);
  }

  async _final(callback: ((error: Error | null | undefined) => void) | undefined) {
    await this.flush();
    callback?.(null);
  }

  async flush() {
    if (this.batch.length === 0) return;

    const tableColumns =
      (await db.introspection.getTables().then((table) => table.find((t) => t.name === this.tableName)))?.columns.map(
        (c) => c.name,
      ) || [];

    await db
      .insertInto(this.tableName as any)
      .values(this.batch.map((row) => pick(row, tableColumns as any)))
      .onConflict((oc) => oc.doNothing())
      .execute();

    debug(`Inserted ${this.batch.length} rows into ${this.tableName}`);
    this.batch = [];
  }
}
