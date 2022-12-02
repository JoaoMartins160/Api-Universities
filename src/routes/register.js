const express = require('express')
const router = express.Router();
const registercontroller = require('../controllers/register.controller');


router.post('/', registercontroller.handleNewUser);

module.exports = router;