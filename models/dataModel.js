const stageJson = require('../json/stage.json');
const player = require('../json/player.json');
const questConfig = require('../config/conf.json');
const transaction = require('../json/transaction.json');

exports.getPlayerList = () => {
    if (player && player.playerlist)
        return player.playerlist;
    else
        return null;
}

exports.getPlayer = () => {
    if (player)
        return player;
    else
        return null;
}

exports.getStageJson = () => {
    if (stageJson.stage)
        return stageJson.stage;
    else
        return null;
}

exports.getQuestConfig = () => {
    if (questConfig)
        return questConfig
    else
        return null;
}

exports.getTransaction = () => {
    if (transaction)
        return transaction
    else
        return null;
}