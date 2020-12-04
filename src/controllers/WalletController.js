const WalletRepository = require('../models/wallet');

const getAll = async (req,res) => {
  const records = await WalletRepository.getAllByUser(req.userId);
  const total = WalletRepository.calcTotal(records).toFixed(2);
  res.status(200).send(
    { 
      records, 
      total 
    });
}

module.exports = {
  getAll
}