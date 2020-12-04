const db = require('../database');

async function getAllByUser(userId){
  const result = await db.query(
    'SELECT * FROM wallet WHERE "userId"=$1',
    [userId]
  )
  return result.rows
}

module.exports = {
  getAllByUser
}