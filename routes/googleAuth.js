const express = require('express');
const setClient = require('../controllers/setClient')

const router = express.Router();


router.post('/setClient',setClient);

module.exports = router;