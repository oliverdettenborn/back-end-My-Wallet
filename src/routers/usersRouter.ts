import express from 'express'
import UsersController from '../controllers/UsersController'
import authMiddleware from '../midllewares/authMiddleware'

const router = express.Router()

router.post('/sign-up', UsersController.signUp)
router.post('/sign-in', UsersController.signIn)
router.post('/sign-out', authMiddleware, UsersController.signOut)

export default router
