import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'

import { Clause, Report, ReportsToClauses, schema } from './schema'
import migrations from './migrations'
// import Post from './model/Post' // ⬅️ You'll import your Models here

const adapter = new LokiJSAdapter({
  schema,
  // (You might want to comment out migrations for development purposes -- see Migrations documentation)
  migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  // dbName: 'myapp', // optional db name

  // --- Optional, but recommended event handlers:

  onQuotaExceededError: (error) => {
    // Browser ran out of disk space -- offer the user to reload the app or log out
    console.log('onQuotaExceededError', error)
  },
  onSetUpError: (error) => {
    // Database failed to load -- offer the user to reload the app or log out
    console.log('onSetUpError', error)
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite: () => {
      // Called when this adapter is forced to overwrite contents of IndexedDB.
      // This happens if there's another open tab of the same app that's making changes.
      // Try to synchronize the app now, and if user is offline, alert them that if they close this
      // tab, some data may be lost
      console.log('onDidOverwrite')
    },
    onversionchange: () => {
      // database was deleted in another browser tab (user logged out), so we must make sure we delete
      // it in this tab as well - usually best to just refresh the page
      console.log('onversionchange')
    },
  },
})

export const db = new Database({
  adapter,
  modelClasses: [Report, Clause, ReportsToClauses],
})
