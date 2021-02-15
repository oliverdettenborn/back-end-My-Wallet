import express from 'express'
import UsersController from '../controllers/UsersController'
import authMiddleware from '../midllewares/authMiddleware'
import UserValidation from '../schemas/users'
import { RequestMiddleware } from '../interfaces'

const router = express.Router()

router.post('/sign-up', async (req, res) => {
  const { error } = UserValidation.create(req.body)

  if (error) return res.status(422).send({ message: error.details[0].message })

  const user = await UsersController.signUp(req.body)
  res.status(201).send(user)
})

router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body

  const { error } = UserValidation.verify(req.body)
  if (error) return res.status(422).send({ message: error.details[0].message })

  const session = await UsersController.signIn(email, password)
  res.status(200).send(session)
})

router.post('/sign-out', authMiddleware, async (req: RequestMiddleware, res) => {
  const { token } = req.session
  await UsersController.signOut(token)
  res.sendStatus(200)
})

export default router
