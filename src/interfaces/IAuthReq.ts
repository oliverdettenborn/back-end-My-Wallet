import { Request } from 'express'

export interface RequestMiddleware extends Request {
  userId: number,
  session: number,
}
