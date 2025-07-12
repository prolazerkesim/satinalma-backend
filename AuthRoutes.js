const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

const hardcodedUser = {
  username: 'admin',
  password: '123456'
};

router.use(express.json()); // express.json middleware burada olmuyorsa body boş gelir

router.post('/login', (req, res) => {
  console.log('Login isteği geldi:', req.body); // Gönderilen body

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Kullanıcı adı ve şifre gerekli." });
  }

  if (username === hardcodedUser.username && password === hardcodedUser.password) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token });
  }

  return res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
});

module.exports = router;
