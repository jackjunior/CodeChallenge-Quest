const supertest = require('supertest')
const app = require('../app');
const dataModel = require('../models');

// testing data
let playerId = '1006';
let inputData = {
    "PlayerId": '1008',
    "PlayerLevel": 2,
    "ChipAmountBet": 100
};

test("POST /api/progress", async () => {
    await supertest(app)
        .post("/api/progress")
        .send(inputData)
        .expect(200)
        .then((response) => {
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.body.PlayerId).toEqual(testingData.PlayerLevel)
            
        })
});