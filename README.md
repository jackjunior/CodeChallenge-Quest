# CodeChallenge

# Welcome to Code Challenge repository!

## Project Background

This project is providing 2 APIs for a player to earn quest points to complete different milestones. Once the level completes, each milestone will provide an amount of chips awarded and return to the player.

## Service Start

How to make the service up and running:

1. Open terminal and goto project folder install package modules

```
npm install
npm install nodemon --save
```

2. Start API service to start the game

```
nodemon app.js
```

## Service Test
There are 2 ways to test the API service:
1. Trigger request through API testing clients
   - VS Code extension `Thunder Client`
   - Postman
2. Run through the unit testing program to check the testing coverage

```
npm test
```
The sample test report as the following:
![image](https://user-images.githubusercontent.com/891759/123460508-4f212c80-d61a-11eb-99c9-acccbc613d6c.png)

All player's record and bet transaction will store into 2 JSON files:
1. json
   - player.json - including `PlayerId`, `AccumulateEarnPoint`, `TotalQuestPercentCompleted`, `MilestonesComplete` data field
   ![image](https://user-images.githubusercontent.com/891759/123506708-3bb4a680-d698-11eb-9486-e9e5ae4a94b4.png)
2. json
   - transaction.json - including all place bet records of each player - including `PlayerId`, `BetAmount` and `TimeStamp` data field
   ![image](https://user-images.githubusercontent.com/891759/123507459-1c1f7d00-d69c-11eb-971a-7aaad206403a.png)
   
## Service Configuration
This project provide 2 config files which control the quest point calculation factors and total milesstones of a quest:
1. config
   - config.json - include `RateFromBet` and `LevelBonusRate` parameters
   ![image](https://user-images.githubusercontent.com/891759/123461913-416ca680-d61c-11eb-9d35-ffbe93a86cbf.png)
2. json
   - stage.json - total milestones of the quest include `MilestoneIndex`, `TotalQuestPoint` and `MileStoneChipAward` parameters
   ![image](https://user-images.githubusercontent.com/891759/123462266-aaecb500-d61c-11eb-9c62-41e13dc8e135.png)
   
## How to play the quest
1. Open API testing client like Thunder Client or Postman
2. Assume a player registered the player id and created first record in `player.json`
 - `RateFromBet` = 3
 - `LevelBonusRate` = 2
```
{
    "playerlist": [
        {
            "PlayerId": "1006",
            "AccumulateEarnPoint": 0
        }
    ]
}
```
3. Trigger the POST request to `http://localhost:3000/api/progress` with following request body
```
{
    "PlayerId": "1006",
    "PlayerLevel": 1,
    "ChipAmountBet": 100
}
```
4. Service will return a response with `QuestPointsEarned`, `TotalQuestPercentCompleted` and `MilestonesCompleted`
   - `HTTP Status Code: 200`
```
{
  "QuestPointsEarned": 302,
  "TotalQuestPercentCompleted": 30,
  "MilestonesCompleted": [
    {
      "MilestoneIndex": 1,
      "ChipsAwarded": 20
    },
    {
      "MilestoneIndex": 2,
      "ChipsAwarded": 40
    },
    {
      "MilestoneIndex": 3,
      "ChipsAwarded": 60
    }
  ]
}
```
The above response shows player completed 3 milestones and received total 120 chips awarded.
5. We can also trigger the GET request to `http://localhost:3000/api/state/1006` to retrieve player's current state
```
{
  "TotalQuestPercentCompleted": 30,
  "LastMilestoneIndexCompleted": 3
}
```
6. Base on `stage.json` defined that there are total 10 milestones and maximum 1000 quest points require,
   Once the player reach to 1000 quest points, the response will be the following:
```
{
  "QuestPointsEarned": 304,
  "TotalQuestPercentCompleted": 100,
  "MilestonesCompleted": [
    {
      "MilestoneIndex": 1,
      "ChipsAwarded": 20
    },
    {
      "MilestoneIndex": 2,
      "ChipsAwarded": 40
    },
    {
      "MilestoneIndex": 3,
      "ChipsAwarded": 60
    },
    {
      "MilestoneIndex": 4,
      "ChipsAwarded": 80
    },
    {
      "MilestoneIndex": 5,
      "ChipsAwarded": 100
    },
    {
      "MilestoneIndex": 6,
      "ChipsAwarded": 120
    },
    {
      "MilestoneIndex": 7,
      "ChipsAwarded": 140
    },
    {
      "MilestoneIndex": 8,
      "ChipsAwarded": 160
    },
    {
      "MilestoneIndex": 9,
      "ChipsAwarded": 180
    },
    {
      "MilestoneIndex": 10,
      "ChipsAwarded": 200
    }
  ]
}
```

# Hope you enjoy the quest and let's play together!
