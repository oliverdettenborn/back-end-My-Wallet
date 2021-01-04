const db = require('../database');
const dayjs = require('dayjs');

async function getAllByUser(userId){
  const result = await db.query(
    'SELECT * FROM wallet WHERE "userId"=$1 ORDER BY id DESC',
    [userId]
  )
  return result.rows
}

async function newRecord(userId, body){
  const date = dayjs().format('DD/MM');
  const result = await db.query(
    'INSERT INTO wallet ("userId", description, amount, kind, "insertionDate") VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [userId, body.description, body.amount, body.kind, date]
  )
  return result.rows[0]
}

async function deleteRecord(userId, idRecord){
  await db.query(
    'DELETE FROM wallet WHERE "userId"=$1 AND id=$2',
    [+userId, +idRecord]
  )
}

function calcTotal(list){
  const values = list.map(item => parseFloat(item.amount.replace('R$ ','').replace(/\./g, "").replace(',','.')))
  return values.reduce((n,total) => n + total, 0)
}

module.exports = {
  getAllByUser,
  calcTotal,
  newRecord,
  deleteRecord
}