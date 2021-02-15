import { getRepository } from 'typeorm'
import User from '../models/User'
import Session from '../models/Session'
import { v4 } from 'uuid'
import * as bcrypt from 'bcrypt'

import { ConflictError, NotFoundError, UnauthorizedError } from '../errors'

class UsersController {
  async signIn (email: string, password: string) {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ where: { email } })
    if (!user) throw new NotFoundError()

    const validationPassword = bcrypt.compareSync(password, user.password)
    if (!validationPassword) throw new UnauthorizedError()
    const token = v4()

    const sessionRepository = getRepository(Session)
    await sessionRepository.save({
      token,
      user: {
        id: user.id
      }
    })

    return { token, name: user.name }
  }

  async signOut (token: string) {
    const sessionRepository = getRepository(Session)
    const session = await sessionRepository.findOne({ where: { token } })

    if (!session) throw new NotFoundError()

    return await sessionRepository.remove(session)
  }

  async signUp ({ name, email, password }) {
    const userRepository = getRepository(User)
    const emailIsUnique = await userRepository.findOne({ where: { email } })
    if (emailIsUnique) throw new ConflictError()

    const hash = bcrypt.hashSync(password, 12)
    const user = await userRepository.save({
      name,
      email,
      password: hash
    })
    return { email: user.email, name: user.name }
  }
}

export default new UsersController()
