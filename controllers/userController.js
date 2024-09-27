const db = require('../config/db').connectDB();

const getUsers = (req, res) => {
  db.query('SELECT id, name, email FROM users', (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(200).json(results);
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;

  db.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  });
};

module.exports = { getUsers, deleteUser };
