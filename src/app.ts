import * as dotenv from 'dotenv'
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import cors from 'cors'
import usersRouter from './routers/usersRouter'
import walletRouter from './routers/walletRouter'
import authMiddleware from './midllewares/authMiddleware'
import { ConflictError, NotFoundError, UnauthorizedError } from './errors'
import 'express-async-errors'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/wallet', authMiddleware, walletRouter)

app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  if (error instanceof NotFoundError) res.sendStatus(404)
  else if (error instanceof UnauthorizedError) res.sendStatus(401)
  else if (error instanceof ConflictError) res.sendStatus(409)
  res.status(500).json(error)
})

export default app
