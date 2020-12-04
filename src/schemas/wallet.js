const { number } = require('joi');
const joi = require('joi');

const schemaEntry = joi.object({
  description: joi.string().required(),
  value: joi.string().pattern(/^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/, 'format brazilian money').required(),
  kind: joi.string().pattern(/^entry$/).required()
})

const schemaOutgoing = joi.object({
  description: joi.string().required(),
  value: joi.string().pattern(/^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/, 'format brazilian money').required(),
  kind: joi.string().pattern(/^outgoing$/).required()
})

function entry(data){
  return schemaEntry.validate(data);
}

function outgoing(data){
  return schemaOutgoing.validate(data);
}

module.exports = {
  entry,
  outgoing,
}