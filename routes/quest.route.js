const express = require('express');
const router = express.Router();

const quest_contoller = require('../controller/quest.controller');

// RESTful router
// Retrive All Player 
router.get('/state/:PlayerId', quest_contoller.player_list);

// Update a player content
router.post('/progress', quest_contoller.player_update);

module.exports = router;