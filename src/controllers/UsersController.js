const UserValidation = require('../schemas/users');
const UsersRepository = require('../models/users');

const SignIn = (req,res) => {

}

const SignUp = async (req,res) => {
  if(!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword){
    return res.sendStatus(400)
  }

  const { error } = UserValidation.create(req.body);

  if(error) return res.status(422).send({ error: error.details[0].message })
  
  const emailIsUnique = await UsersRepository.emailIsUnique(req.body.email)
  if(!emailIsUnique) return res.status(409).send({ error: "Email already exists" })

  const { id, name, email } = await UsersRepository.create(req.body);
  res.status(201).send({ id, name, email })
}

module.exports = {
  SignIn,
  SignUp
}