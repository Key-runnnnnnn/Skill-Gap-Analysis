const express = require('express');
const router = express.Router();
const skillGapController = require('../controllers/skillGapController');

router.post('/', skillGapController.analyzeSkillGap);

module.exports = router;
