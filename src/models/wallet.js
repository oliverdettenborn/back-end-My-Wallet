const db = require('../database');

async function getAllByUser(userId){
  const result = await db.query(
    'SELECT * FROM wallet WHERE "userId"=$1 ORDER BY id DESC',
    [userId]
  )
  return result.rows
}

function calcTotal(list){
  const values = list.map(item => parseFloat(item.amount.split('R$ ')[1].replace(',','.')))
  return values.reduce((n,total) => n + total, 0)
}

module.exports = {
  getAllByUser,
  calcTotal
}