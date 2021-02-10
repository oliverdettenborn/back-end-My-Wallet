import bcrypt from 'bcrypt'
import db from '@database/index'
import { IUser } from 'src/interfaces'

async function create (name: string, email: string, password: string): Promise<IUser> {
  const hash = bcrypt.hashSync(password, 12)
  const result = await db.query(
    'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING (id, name, email)',
    [name, email, hash]
  )
  return result.rows[0]
}

async function emailIsUnique (email: string): Promise<boolean> {
  const result = await db.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  )
  return result.rows.length === 0
}

async function findByEmail (email: string): Promise<IUser> {
  const result = await db.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  )
  return result.rows[0]
}

export default {
  create,
  emailIsUnique,
  findByEmail
}
