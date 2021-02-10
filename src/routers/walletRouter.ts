import express from 'express'
import WalletController from '../controllers/WalletController'

const router = express.Router()

router.get('/', WalletController.getAll)
router.post('/entry', WalletController.createEntry)
router.post('/outgoing', WalletController.createOutgoing)

export default router
