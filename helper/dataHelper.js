const fs = require('fs');

const dataModel = require('../models/dataModel');
const rateFromBet = dataModel.getQuestConfig().RateFromBet;
const levelBonusRate = dataModel.getQuestConfig().LevelBonusRate;

// Start to play the quest
exports.playQuest = (pId, pLevel, chipAmount) =>
{
    let playerList = dataModel.getPlayerList();
    if (!playerList)
        return playerList;

    let checkRecord = playerList.find(data => data.PlayerId === pId);
    let totalQuestPoint = 0;

    // Check player does exist in record
    // - if not create an new player
    // - if player exist, update player's record
    if (!checkRecord)
        return createNewPlayer(pId, pLevel, chipAmount);
    else
        return updatePlayerRecord(pId, pLevel, chipAmount);
}

// Create new player to play the quest
createNewPlayer = (pId, pLevel, chipAmount) =>{
    
    let playerList = dataModel.getPlayerList();

    // Calcluate current bet amount quest points
    let totalQuestPoint = (chipAmount * rateFromBet) + (pLevel * levelBonusRate);

    // Check completed mile stone
    let completedMileStone = mileStoneComplete(totalQuestPoint);
    let totalStage = dataModel.getStageJson().length;

    // Calculate total percentage of quest complete
    let totalPercentComplete = Math.ceil((completedMileStone.length / totalStage) * 100);

    // Add new player's record to player list 
    let newPlayerRecord ={
        "PlayerId": pId,
        "AccumulateEarnPoint": totalQuestPoint,
        "TotalQuestPercentCompleted": totalPercentComplete,
        "MilestonesComplete": completedMileStone
    }
    playerList.push(newPlayerRecord);

    // Write player's record to /json/player.json
    fs.writeFile('./json/player.json', JSON.stringify(dataModel.getPlayer()), 'utf8', (err) =>{
        if (err) throw err;
    });

    // Insert transaction record
    let transModel = dataModel.getTransaction();
    let newTrans = {
        "PlayerId": pId,
        "BetAmount": chipAmount,
        "TimeStamp": getDateTimeUTC()
    }
    transModel.transRecord.push(newTrans);

    // Write player's record to /json/transaction.json
    fs.writeFile('./json/transaction.json', JSON.stringify(transModel), 'utf8', (err) =>{
        if (err) throw err;
    });

    let msgResponse = {
        "QuestPointsEarned" : totalQuestPoint,
        "TotalQuestPercentCompleted" : totalPercentComplete,
        "MilestonesCompleted": completedMileStone
    }

    return msgResponse;
}

// Update existing player's record
updatePlayerRecord = (pId, pLevel, chipAmount) =>{
    
    let playerList = dataModel.getPlayerList();

    // Get existing player's record
    let playerRecord = playerList.find(data => data.PlayerId === pId);

    // Calculate current bet amount quest point + player's accumulated earn point
    let totalQuestPoint = (chipAmount * rateFromBet) + (pLevel * levelBonusRate);

    // Check player's total quest point completed mile stone
    let completedMileStone = mileStoneComplete(totalQuestPoint + playerRecord.AccumulateEarnPoint);

    // Sum completed total quest point for calculating complete percentage
    let totalStage = dataModel.getStageJson().length;

    // Calculate total percentage of quest complete
    let totalPercentComplete = Math.ceil((completedMileStone.length / totalStage) * 100);

    // Update player's record
    playerRecord.AccumulateEarnPoint += totalQuestPoint;
    playerRecord.TotalQuestPercentCompleted = totalPercentComplete;
    playerRecord.MilestonesComplete = completedMileStone;
    
    // Write player's record to /json/player.json
    fs.writeFile('./json/player.json', JSON.stringify(dataModel.getPlayer()), 'utf8', (err) =>{
        if (err) throw err;
    });

    // Insert transaction record
    let transModel = dataModel.getTransaction();
    let newTrans = {
        "PlayerId": pId,
        "BetAmount": chipAmount,
        "TimeStamp": getDateTimeUTC()
    }
    transModel.transRecord.push(newTrans);

    // Write player's record to /json/transaction.json
    fs.writeFile('./json/transaction.json', JSON.stringify(transModel), 'utf8', (err) =>{
        if (err) throw err;
    });

    let msgResponse = {
        "QuestPointsEarned" : totalQuestPoint,
        "TotalQuestPercentCompleted" : totalPercentComplete,
        "MilestonesCompleted": completedMileStone
    }

    return msgResponse;
}

mileStoneComplete = (questPoint) =>{
    let mileStone = dataModel.getStageJson()
                    .filter(data => data.TotalQuestPoint <= questPoint)
                    .map(item => ({"MilestoneIndex": item.MilestoneIndex, "ChipsAwarded": item.MileStoneChipAward}));
    
    return mileStone; 
}

getDateTimeUTC = () => {
    let currentDate = new Date();
    let currentMonth = currentDate.getUTCMonth() + 1;
    let timeSatmp = currentDate.getUTCFullYear() +"-"+
                    currentMonth +"-"+
                    currentDate.getUTCDate() +" "+
                    currentDate.getHours() +":"+
                    currentDate.getUTCMinutes() +"."+
                    currentDate.getSeconds()
    return timeSatmp;
}

