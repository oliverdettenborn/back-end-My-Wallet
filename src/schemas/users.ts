const joi = require('joi')

interface ISignUp {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

const schemaSignUp = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().alphanum().trim().min(6)
    .max(16)
    .required(),
  confirmPassword: joi.ref('password')
})

interface ISignIn {
  email: string,
  password: string,
}

const schemaSignIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(6).max(16)
    .required()
})

function create (data: ISignUp) {
  return schemaSignUp.validate(data)
}

function verify (data: ISignIn) {
  return schemaSignIn.validate(data)
}

export default {
  create,
  verify
}
