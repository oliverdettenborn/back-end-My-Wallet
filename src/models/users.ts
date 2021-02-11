import bcrypt from 'bcrypt'
import db from '../database'
export default class User {
  id?: number;
  name: string;
  email: string;
  password: string;

  constructor ({ id, name, email, password }: User) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  static async create (name: string, email: string, password: string) {
    const hash = bcrypt.hashSync(password, 12)
    const result = await db.query(
      'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *',
      [name, email, hash]
    )
    return result.rows[0] as User
  }

  static async emailIsUnique (email: string) {
    const result = await db.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    )
    return (result.rows.length === 0)
  }

  static async findByEmail (email: string) {
    const result = await db.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    )
    return result.rows[0] as User
  }
}
