require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const UsersController = require('./controllers/UsersController');

app.post('/api/users/sign-up', UsersController.SignUp)
app.post('/api/users/sign-in', UsersController.SignIn)

module.exports = app;