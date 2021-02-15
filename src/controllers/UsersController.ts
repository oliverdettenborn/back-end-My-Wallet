import { getRepository } from 'typeorm'
import { User } from '../models/User'
import { Session } from '../models/Session'
import { v4 } from 'uuid'
import * as bcrypt from 'bcrypt'

import { ConflictError, NotFoundError, UnauthorizedError } from '../errors'

const sessionRepository = getRepository(Session)
const userRepository = getRepository(User)

class UsersController {
  async signIn (email: string, password: string) {
    const user = await userRepository.findOne({ where: { email } })
    if (!user) throw new UnauthorizedError()

    const validationPassword = bcrypt.compareSync(password, user.password)
    if (!validationPassword) throw new UnauthorizedError()
    const token = v4()

    await sessionRepository.create({
      token,
      user: {
        id: user.id
      }
    })

    return { token, name: user.name }
  }

  async signOut (token: string) {
    const session = await sessionRepository.findOne({ where: { token } })

    if (!session) throw new NotFoundError()

    return await sessionRepository.remove(session)
  }

  async signUp ({ name, email, password }) {
    const emailIsUnique = await userRepository.findOne({ where: { email } })
    if (emailIsUnique) throw new ConflictError()

    const hash = bcrypt.hashSync(password, 12)
    return await userRepository.create({
      name,
      email,
      password: hash
    })
  }
}

export default new UsersController()
