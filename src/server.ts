require('dotenv').config();
const express = require('express');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const UsersController = require('./controllers/UsersController');
const WalletController = require('./controllers/WalletController');
const authMiddleware = require('./midllewares/authMiddleware');

app.post('/api/users/sign-up', UsersController.signUp);
app.post('/api/users/sign-in', UsersController.signIn);
app.post('/api/users/sign-out', authMiddleware, UsersController.signOut);

app.get('/api/user/wallet', authMiddleware, WalletController.getAll);
app.post('/api/user/wallet/entry', authMiddleware, WalletController.createEntry);
app.post('/api/user/wallet/outgoing', authMiddleware, WalletController.createOutgoing);
app.delete('/api/user/wallet/:idRecord', authMiddleware, WalletController.deleteRecord);

module.exports = app;
