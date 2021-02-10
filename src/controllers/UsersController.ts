import Users from '../models/users'
import Sessions from '../models/sessions'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

import { ConflictError, UnauthorizedError } from '../errors'
import { IUser } from 'src/interfaces'

class UsersController {
  async signIn (email: string, password: string) {
    const user = await Users.findByEmail(email)
    if (!user) throw new UnauthorizedError()

    const validationPassword = bcrypt.compareSync(password, user.password)
    if (!validationPassword) throw new UnauthorizedError()
    const token = v4()

    const userSession = await Sessions.create(user, token)
    return { ...userSession, name: user.name }
  }

  async signOut (token: string) {
    return Sessions.deleteByToken(token)
  }

  async signUp ({ name, email, password }: IUser) {
    const emailIsUnique = await Users.emailIsUnique(email)
    if (!emailIsUnique) throw new ConflictError()

    return Users.create(name, email, password)
  }
}

export default new UsersController()
