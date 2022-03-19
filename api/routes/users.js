const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ error: 'email already exists' });
      }

      const salt = brypt.genSaltSync(10);
      const hash = brypt.hashSync(password, salt);

      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        email,
        password: hash,
      });

      newUser.save()
        .then(() => {
          res.status(201).json({ message: 'user created successfully' });
        })
        .catch(error => {
          res.status(400).json({ error });
        });
    })
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: 'invalid password or email' });
      }

      const isValid = brypt.compareSync(password, user.password);

      if (!isValid) {
        return res.status(400).json({ error: 'invalid password or email' });
      }

      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.status(200).json({ message: 'login successful', token });
    })
});

module.exports = router;