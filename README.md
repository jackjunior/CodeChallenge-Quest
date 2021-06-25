# CodeChallenge

# Welcome to Code Challenge repository!

## Project Background

This project is providing 2 APIs for a player to earn quest points to complete different milestones. Once the level completes, each milestone will provide an amount of chips awarded and return to the player.

## Service Start

How to make the service up and running:

1. Open terminal and goto project folder install package modules

```
npm install
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

## Service Configuration
This project provide 2 config files which control the quest point calculation factors and total milesstones of a quest:
1. config
   - config.json - include `RateFromBet` and `LevelBonusRate` parameters
   ![image](https://user-images.githubusercontent.com/891759/123461913-416ca680-d61c-11eb-9d35-ffbe93a86cbf.png)
2. json
   - stage.json - total milestones of the quest include `MilestoneIndex`, `TotalQuestPoint` and `MileStoneChipAward` parameters
   ![image](https://user-images.githubusercontent.com/891759/123462266-aaecb500-d61c-11eb-9c62-41e13dc8e135.png)
