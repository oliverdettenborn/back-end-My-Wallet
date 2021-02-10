import bcrypt from 'bcrypt'
import db from '@database/index'

async function create ({ name, email, password }) {
  const hash = bcrypt.hashSync(password, 12)
  const result = await db.query(
    'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *',
    [name, email, hash]
  )
  return result.rows[0]
}

async function emailIsUnique (email) {
  const result = await db.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  )
  return result.rows.length === 0
}

async function findByEmail (email) {
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
