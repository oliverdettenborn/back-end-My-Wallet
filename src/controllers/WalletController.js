const WalletRepository = require('../models/wallet');

const getAll = async (req,res) => {
  const registers = await WalletRepository.getAllByUser(req.userId);
  res.status(200).send(registers);
}

module.exports = {
  getAll
}