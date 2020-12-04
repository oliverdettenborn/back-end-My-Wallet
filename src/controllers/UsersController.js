const UserValidation = require('../schemas/users');
const UsersRepository = require('../models/users');
const SessionsRepository = require('../models/sessions');

const signIn = async (req,res) => {
  if(!req.body.email || !req.body.password){
    return res.sendStatus(400)
  }

  const { error } = UserValidation.verify(req.body);
  if(error) return res.status(422).send({ message: error.details[0].message })

  const user = await UsersRepository.findByEmail(req.body.email);
  if(!user) return res.sendStatus(401);
  const newSession = await SessionsRepository.create(user, req.body.password);
  if(!newSession) return res.sendStatus(401);

  res.status(200).send(newSession);
}

const signUp = async (req,res) => {
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

const signOut = async (req,res) => {
  const { token } = req.session;
  await SessionsRepository.deleteByToken(token);
  res.sendStatus(200);
}

module.exports = {
  signIn,
  signUp,
  signOut,
}