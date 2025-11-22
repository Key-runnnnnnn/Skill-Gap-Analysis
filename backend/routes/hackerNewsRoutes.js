const express = require('express');
const router = express.Router();
const hackerNewsController = require('../controllers/hackerNewsController');

router.get('/', hackerNewsController.getTopStories);

module.exports = router;
