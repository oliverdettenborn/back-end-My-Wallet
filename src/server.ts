import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import usersRouter from './routers/usersRouter'
import walletRouter from './routers/walletRouter'
import authMiddleware from './midllewares/authMiddleware'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/wallet', authMiddleware, walletRouter)

export default app
