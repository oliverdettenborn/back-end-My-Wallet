import db from '../database'
import { IWallet } from '../interfaces'

export default class Wallet {
  id: number;
  userId: number;
  description: string;
  amount: string;
  kind: string;
  insertionDate: Date;

  constructor ({ id, userId, description, amount, kind, insertionDate }: Wallet) {
    this.id = id
    this.userId = userId
    this.description = description
    this.amount = amount
    this.kind = kind
    this.insertionDate = insertionDate
  }

  static async getAllByUser (userId: number): Promise<Wallet[]> {
    const result = await db.query(
      'SELECT * FROM wallet WHERE "userId"=$1 ORDER BY id DESC',
      [userId]
    )
    return result.rows.map((element: Wallet) => new Wallet(element))
  }

  static async newRecord (userId: number, wallet: IWallet) {
    const result = await db.query(
      'INSERT INTO wallet ("userId", description, amount, kind, "insertionDate") VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [userId, wallet.description, wallet.amount, wallet.kind, new Date()]
    )
    return new Wallet(result.rows[0])
  }

  static async deleteById (userId: number, idRecord: number) {
    await db.query(
      'DELETE FROM wallet WHERE "userId"=$1 AND id=$2',
      [+userId, +idRecord]
    )
  }

  static calcTotal (list: Wallet[]) {
    const values = list.map((item) => parseFloat(item.amount.replace('R$ ', '').replace(/\./g, '').replace(',', '.')))
    return values.reduce((n, total) => n + total, 0)
  }
}
