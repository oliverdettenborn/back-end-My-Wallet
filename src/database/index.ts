import { createConnection } from 'typeorm'
import dotenv from 'dotenv'
dotenv.config()

createConnection({
  type: 'postgres',
  url: process.env.DATABASE_URL
})
