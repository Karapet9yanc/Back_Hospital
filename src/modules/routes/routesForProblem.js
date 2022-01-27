const express = require('express');
const router = express.Router();

const {
  createNewProblems,
  getAllProblems
} = require("../controllers/problemController");

router.post('/newProblems', createNewProblems);
router.get('/allProblems', getAllProblems);

module.exports = router