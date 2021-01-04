const WalletRepository = require('../models/wallet');
const WalletValidation = require('../schemas/wallet');

const getAll = async (req,res) => {
  const records = await WalletRepository.getAllByUser(req.userId);
  const total = `R$ ${WalletRepository.calcTotal(records).toFixed(2)}`;
  res.status(200).send({ records, total });
}

const createEntry = async (req,res) => {
  if(!req.body.description || !req.body.amount || !req.body.kind){
    return res.sendStatus(400)
  }

  const { error } = WalletValidation.entry(req.body);
  if(error) return res.status(422).send({ message: error.details[0].message })

  const entry = await WalletRepository.newRecord(req.userId, req.body);
  res.status(201).send(entry);
}

const createOutgoing = async (req,res) => {
  if(!req.body.description || !req.body.amount || !req.body.kind){
    return res.sendStatus(400)
  }

  const { error } = WalletValidation.outgoing(req.body);
  if(error) return res.status(422).send({ message: error.details[0].message })

  req.body.amount = `-${req.body.amount}`;

  const entry = await WalletRepository.newRecord(req.userId, req.body);
  res.status(201).send(entry);
}

module.exports = {
  getAll,
  createEntry,
  createOutgoing
}