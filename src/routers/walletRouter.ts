import express from 'express'
import WalletController from '../controllers/WalletController'
import { RequestMiddleware } from '../interfaces'
import WalletValidation from '../schemas/wallet'

const router = express.Router()

router.get('/', async (req: RequestMiddleware, res) => {
  const records = await WalletController.getAll(req.userId)
  res.status(200).send(records)
})

router.post('/entry', async (req: RequestMiddleware, res) => {
  const { error } = WalletValidation.entry(req.body)
  if (error) return res.status(422).send({ message: error.details[0].message })

  const entry = await WalletController.createEntry(req.userId, req.body)
  res.status(201).send(entry)
})

router.post('/outgoing', async (req: RequestMiddleware, res) => {
  const { error } = WalletValidation.outgoing(req.body)
  if (error) return res.status(422).send({ message: error.details[0].message })

  const outgoing = await WalletController.createEntry(req.userId, req.body)
  res.status(201).send(outgoing)
})

export default router
