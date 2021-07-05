const dataModel = require('../models/dataModel');
const dataHelper = require('../helper/dataHelper');

// Retrieve player state
exports.player_list = (req, res) =>{
    if (!req.params.PlayerId)
        return res.status(400).send({message: "PlayerId is required for retriving player's state!"});

    // Find corresponding player to get player's state
    let playerRecord = dataModel.getPlayerList().find(player => player.PlayerId === req.params.PlayerId);
    
    if (!dataModel.getPlayerList() || !playerRecord)
        return res.status(404).send({message: "No player's record found!"});
    
    return res.status(200).send({
        "TotalQuestPercentCompleted" : playerRecord.TotalQuestPercentCompleted,
        "LastMilestoneIndexCompleted" : playerRecord.MilestonesComplete.length
    });
};

//Update a blog content, get update id from request parameter
exports.player_update = (req, res) =>{
    if (!req.body)
        return res.status(400).send({message: "Update Body cannot be empty!"});
    
    if (!req.body.PlayerId || !req.body.PlayerLevel || !req.body.ChipAmountBet)
        return res.status(400).send({message: "PlayerId, PlayerLevel and ChipAmountBet is required!"});

    let msgResponse = "";
    if (!(isNaN(req.body.PlayerLevel)) && !(isNaN(req.body.ChipAmountBet)) &&
        (req.body.PlayerLevel >= 0) && (req.body.ChipAmountBet >= 0))
        msgResponse = dataHelper.playQuest(req.body.PlayerId, req.body.PlayerLevel, req.body.ChipAmountBet);
    else
        return res.status(400).send({message: "PlayerLevel, ChipAmountBet must be number and greater or equal to 0!"});


    return res.status(200).send(msgResponse);
};