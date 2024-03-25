import { ElectricConfig } from 'electric-sql'
import { schema } from './generated/client'
import { insecureAuthToken } from 'electric-sql/auth'
import { electrify, ElectricDatabase } from 'electric-sql/wa-sqlite'

const config = {
  url: 'http://localhost:5133'
} satisfies ElectricConfig;

const conn = await ElectricDatabase.init('electric.db', "/")
export const electric = await electrify(conn, schema, config)
await electric.connect(insecureAuthToken({ sub: "salut"}))

const { synced } = await electric.db.Report.sync()