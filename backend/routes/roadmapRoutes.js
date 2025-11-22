const express = require('express');
const router = express.Router();
const roadmapController = require('../controllers/roadmapController');

router.post('/', roadmapController.generateRoadmap);

module.exports = router;
