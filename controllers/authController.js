const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js').connectDB();

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    bcrypt.hash(password, 10, (error, hashedPassword) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error', error });
      }

      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (error) => {
        if (error) {
          return res.status(500).json({ message: 'Internal server error', error });
        }

        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error', error });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error', error });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const isAdmin = (user.email === process.env.ADMIN);
      return res.status(200).json({ token, isAdmin });
    });
  });
};

module.exports = { register, login };
