const joi = require('joi');

const schemaSignUp = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().alphanum().trim().min(6).max(16).required(),
  confirmPassword: joi.ref('password')
})

const schemaSignIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(6).max(16).required()
})

function create(data){
  return schemaSignUp.validate(data);
}

function verify(data){
  return schemaSignIn.validate(data);
}

module.exports = {
  create,
  verify,
}