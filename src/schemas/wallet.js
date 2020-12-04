const joi = require('joi');

const schemaEntry = joi.object({
  description: joi.string().pattern(/[\w\s\d]/, 'apenas letras e numeros').trim().required(),
  amount: joi.string().pattern(/^[0-9]+(,[0-9]{1,2})?$/).required(),
  kind: joi.string().pattern(/^entry$/).required()
})

const schemaOutgoing = joi.object({
  description: joi.string().pattern(/[\w\s\d]/, 'apenas letras e numeros').trim().required(),
  amount: joi.string().pattern(/^[0-9]+(,[0-9]{1,2})?$/).required(),
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