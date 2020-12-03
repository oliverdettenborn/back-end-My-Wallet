const UserValidation = require('../schemas/users');
const UsersRepository = require('../models/users');
const SessionsRepository = require('../models/sessions');

const SignIn = async (req,res) => {
  if(!req.body.email || !req.body.password){
    return res.sendStatus(400)
  }

  const { error } = UserValidation.verify(req.body);
  if(error) return res.status(422).send({ message: error.details[0].message })

  const user = await UsersRepository.findByEmail(req.body.email);
  const newSession = await SessionsRepository.create(user, req.body.password);
  if(!user || !newSession) return res.sendStatus(401);

  res.status(200).send(newSession);
}

const SignUp = async (req,res) => {
  if(!req.body.name || !req.body.email || !req.body.password || !req.body.confirmPassword){
    return res.sendStatus(400)
  }

  const { error } = UserValidation.create(req.body);

  if(error) return res.status(422).send({ message: error.details[0].message })
  
  const emailIsUnique = await UsersRepository.emailIsUnique(req.body.email)
  if(!emailIsUnique) return res.status(409).send({ message: "Email already exists" })

  const { id, name, email } = await UsersRepository.create(req.body);
  res.status(201).send({ id, name, email })
}

module.exports = {
  SignIn,
  SignUp
}