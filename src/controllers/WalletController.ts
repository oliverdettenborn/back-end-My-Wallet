import { Wallet } from '../models/Wallet'

class WalletController {
  async getAll (userId: number) {
    // const records = await Wallet.getAllByUser(userId)
    // const total = `R$ ${Wallet.calcTotal(records).toFixed(2)}`
    // return { records, total }
  }

  createEntry (userId: number, wallet: Wallet) {
    // return Wallet.newRecord(userId, wallet)
  }

  createOutgoing (userId: number, wallet: Wallet) {
    // wallet.amount = `-${wallet.amount}`
    // return Wallet.newRecord(userId, wallet)
  }

  deleteRecord (userId: number, recordId: number) {
    // return Wallet.deleteById(userId, recordId)
  }
}

export default new WalletController()
