const express = require('express');
const { getUsers, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken'); // Certifique-se de que você está importando o middleware

const router = express.Router();

// Rota para obter todos os usuários (protegida)
router.get('/', verifyToken, getUsers);

// Rota para deletar um usuário por ID (protegida)
router.delete('/:id', verifyToken, deleteUser);

module.exports = router; // Certifique-se de que está exportando o router
