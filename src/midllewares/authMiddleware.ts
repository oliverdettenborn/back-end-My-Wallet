import sessionsRepository from '@models/sessions'

export default async function authMiddleware (req, res, next) {
  const auth = req.header('Authorization')
  if (!auth) return res.status(401).send({ message: 'User token not found' })

  const tokenHeader = auth.split(' ')[1]
  if (!tokenHeader) return res.status(401).send({ message: 'User token not found' })

  const session = await sessionsRepository.findByToken(tokenHeader)
  if (!session) return res.status(401).send({ message: 'Invalid token' })

  req.userId = session.userId
  req.session = session
  next()
}
