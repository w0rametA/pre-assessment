import * as dotenv from 'dotenv'
dotenv.config()

export const env = {
  databasae: {
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbname: process.env.DB_DATABASE,
    sync: !!process.env.DB_SYNC,
  },
}
