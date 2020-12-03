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

module.exports = {
  create,
}