import UserValidation from '../schemas/users'
import UsersRepository from '../models/users'
import SessionsRepository from '../models/sessions'

const signIn = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.sendStatus(400)
    }

    const { error } = UserValidation.verify(req.body)
    if (error) return res.status(422).send({ message: error.details[0].message })

    const user = await UsersRepository.findByEmail(req.body.email)
    if (!user) return res.sendStatus(401)
    const newSession = await SessionsRepository.create(user, req.body.password)
    if (!newSession) return res.sendStatus(401)

    res.status(200).send(newSession)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
}

const signUp = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword) {
      return res.sendStatus(400)
    }

    const { error } = UserValidation.create(req.body)

    if (error) return res.status(422).send({ message: error.details[0].message })

    const emailIsUnique = await UsersRepository.emailIsUnique(req.body.email)
    if (!emailIsUnique) return res.status(409).send({ message: 'Email already exists' })

    const { id, name, email } = await UsersRepository.create(req.body)
    res.status(201).send({ id, name, email })
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
}

export const signOut = async (req, res) => {
  try {
    const { token } = req.session
    await SessionsRepository.deleteByToken(token)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
}

export default {
  signIn,
  signUp,
  signOut
}
