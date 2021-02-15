import { getRepository } from 'typeorm'
import { NotFoundError } from '../errors'
import { IWallet } from '../interfaces'
import Wallet from '../models/Wallet'

class WalletController {
  async getAll (userId: number) {
    const walletRepository = getRepository(Wallet)
    const records = await walletRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    })
    const total = `R$ ${this.calcTotal(records).toFixed(2)}`
    return { records, total }
  }

  createEntry (userId: number, wallet: IWallet) {
    let { description, amount, kind } = wallet

    if (kind === 'outgoing') {
      amount = `-${amount}`
    }

    const walletRepository = getRepository(Wallet)
    return walletRepository.save({
      description,
      amount,
      insertionDate: new Date(),
      kind,
      user: {
        id: userId
      }
    })
  }

  async deleteRecord (userId: number, recordId: number) {
    const walletRepository = getRepository(Wallet)
    const record = await walletRepository.findOne({ where: { id: recordId } })
    if (!record) throw new NotFoundError()
    return walletRepository.remove(record)
  }

  calcTotal (list: Wallet[]) {
    const values = list
      .map(item =>
        parseFloat(item.amount
          .replace('R$ ', '')
          .replace(/\./g, '')
          .replace(',', '.')
        )
      )
    return values.reduce((n, total) => n + total, 0)
  }
}

export default new WalletController()
