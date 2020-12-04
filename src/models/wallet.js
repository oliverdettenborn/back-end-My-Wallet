const db = require('../database');

async function getAllByUser(userId){
  const result = await db.query(
    'SELECT * FROM wallet WHERE "userId"=$1 ORDER BY id DESC',
    [userId]
  )
  return result.rows
}

function calcTotal(list){
  console.log(list)
  const values = list.map(item => parseFloat(item.amount.replace('R$ ','').replace(',','.')))
  console.log(values)
  return values.reduce((n,total) => n + total, 0)
}

module.exports = {
  getAllByUser,
  calcTotal
}