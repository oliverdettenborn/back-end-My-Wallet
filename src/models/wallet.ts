import db from '@database/index'
import { IWallet } from 'src/interfaces'

async function getAllByUser (userId: number) {
  const result = await db.query(
    'SELECT * FROM wallet WHERE "userId"=$1 ORDER BY id DESC',
    [userId]
  )
  return result.rows
}

async function newRecord (userId: number, wallet: IWallet) {
  const date = new Date()
  const result = await db.query(
    'INSERT INTO wallet ("userId", description, amount, kind, "insertionDate") VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [userId, wallet.description, wallet.amount, wallet.kind, date]
  )
  return result.rows[0]
}

async function deleteById (userId: number, idRecord: number) {
  await db.query(
    'DELETE FROM wallet WHERE "userId"=$1 AND id=$2',
    [+userId, +idRecord]
  )
}

function calcTotal (list: IWallet[]) {
  const values = list.map((item) => parseFloat(item.amount.replace('R$ ', '').replace(/\./g, '').replace(',', '.')))
  return values.reduce((n, total) => n + total, 0)
}

export default {
  getAllByUser,
  calcTotal,
  newRecord,
  deleteById
}
