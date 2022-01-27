const express = require('express');
const router = express.Router();

const {
  regUsers,
  logIn
} = require("../controllers/task.controller");

router.post('/createUser', regUsers);
router.post('/logIn', logIn);

module.exports = router