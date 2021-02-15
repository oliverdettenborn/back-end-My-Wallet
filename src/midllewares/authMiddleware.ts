import { getRepository } from 'typeorm'
import Session from '../models/Session.ts'
import { Response, NextFunction } from 'express'
import { RequestMiddleware } from '../interfaces'

export default async function authMiddleware (req: RequestMiddleware, res: Response, next: NextFunction) {
  const auth = req.header('Authorization')
  if (!auth) return res.status(401).send({ message: 'User token not found' })

  const token = auth.split(' ')[1]
  if (!token) return res.status(401).send({ message: 'User token not found' })

  const sessionRepository = getRepository(Session)
  const session = await sessionRepository.findOne({ where: { token } })
  if (!session) return res.sendStatus(401)

  req.userId = session.user.id
  req.session = session
  next()
}
