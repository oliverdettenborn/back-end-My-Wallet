import joi from 'joi'
interface Iwallet {
  description: string,
  amount: string,
  kind: string,
}

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

function entry (data: Iwallet) {
  return schemaEntry.validate(data)
}

function outgoing (data: Iwallet) {
  return schemaOutgoing.validate(data)
}

export default {
  entry,
  outgoing
}
