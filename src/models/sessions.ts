import db from '@database/index'
import { IUser } from 'src/interfaces'

export default class Session {
  id: number;
  userId: number;
  token: string;

  constructor (id: number, userId: number, token: string) {
    this.id = id
    this.userId = userId
    this.token = token
  }

  static async create (user: IUser, token: string) {
    const result = await db.query(
      'INSERT INTO sessions ("userId",token) VALUES ($1,$2) RETURNING *',
      [user.id, token]
    )
    return new Session(result.rows[0].id, result.rows[0].userId, token)
  }

  static async findByToken (token: string) {
    const result = await db.query(
      'SELECT * FROM sessions WHERE token=$1',
      [token]
    )
    return new Session(result.rows[0].id, result.rows[0].userId, result.rows[0].token)
  }

  static async deleteByToken (token: string) {
    await db.query(
      'DELETE FROM sessions WHERE token=$1',
      [token]
    )
  }
}
