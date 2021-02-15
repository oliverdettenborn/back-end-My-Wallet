import { getRepository } from 'typeorm'
import { NotFoundError } from '../errors'
import { IWallet } from '../interfaces'
import { Wallet } from '../models/Wallet'

const walletRepository = getRepository(Wallet)

class WalletController {
  async getAll (userId: number) {
    const records = await walletRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    })
    const total = `R$ ${Wallet.calcTotal(records).toFixed(2)}`
    return { records, total }
  }

  createEntry (userId: number, wallet: IWallet) {
    let { description, amount, kind } = wallet

    if (kind === 'outgoing') {
      amount = `-${amount}`
    }

    return walletRepository.create({
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
    const record = await walletRepository.findOne({ where: { id: recordId } })
    if (!record) throw new NotFoundError()
    return walletRepository.remove(record)
  }
}

export default new WalletController()
