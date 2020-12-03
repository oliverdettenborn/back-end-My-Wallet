require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const UsersController = require('./controllers/UsersController');
const authMiddleware = require('./midllewares/authMiddleware');

//users routes
app.post('/api/users/sign-up', UsersController.signUp)
app.post('/api/users/sign-in', UsersController.signIn)
app.post('/api/users/sign-out', authMiddleware, UsersController.signOut)

module.exports = app;