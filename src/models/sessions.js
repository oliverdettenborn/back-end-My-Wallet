const db = require('../database');
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');

async function create(user, password){
  const validationPassword = bcrypt.compareSync(password, user.password);
  if(!validationPassword) return false;
  const token = uuidv4();
  await db.query(
    'INSERT INTO sessions ("userId",token) VALUES ($1,$2)',
    [ user.id, token ]
  )
  return { userId: user.id, name: user.name, token }
}

async function findByToken(token){
  const result = await db.query(
    'SELECT * FROM sessions WHERE token=$1',
    [ token ]
  )
  return result.rows[0]
}

async function deleteByToken(token){
  await db.query(
    'DELETE FROM sessions WHERE token=$1',
    [ token ]
  )
}

module.exports = {
  create,
  findByToken,
  deleteByToken,
}