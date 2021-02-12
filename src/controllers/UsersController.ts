// import { User } from '../models/Users'
// import { Session } from '../models/Sessions'
// import { v4 } from 'uuid'
// import * as bcrypt from 'bcrypt'

// import { ConflictError, UnauthorizedError } from '../errors'
import { IUser } from '../interfaces'

class UsersController {
  async signIn (email: string, password: string) {
    // const user = await User.findByEmail(email)
    // if (!user) throw new UnauthorizedError()

    // const validationPassword = bcrypt.compareSync(password, user.password)
    // if (!validationPassword) throw new UnauthorizedError()
    // const token = v4()

    // const userSession = await Session.create(user, token)
    // return { ...userSession, name: user.name }
  }

  async signOut (token: string) {
    // return Session.deleteByToken(token)
  }

  async signUp ({ name, email, password }: IUser) {
    // const emailIsUnique = await User.emailIsUnique(email)
    // if (!emailIsUnique) throw new ConflictError()

    // const hash = bcrypt.hashSync(password, 12)
    // return User.create(name, email, hash)
  }
}

export default new UsersController()
