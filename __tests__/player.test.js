const supertest = require('supertest')
const app = require('../server.test');

// testing data
let playerId = '1006';
let inputData = {
    "PlayerId": '1006',
    "PlayerLevel": 2,
    "ChipAmountBet": 100
};
let newPlayerData = {
    "PlayerId": '2001',
    "PlayerLevel": 2,
    "ChipAmountBet": 100
};

// GET player's record
test("GET /api/state/:PlayerId", async () => {
    const url = `/api/state/${playerId}`;
    await supertest(app)
        .get(url)
        .expect(200)
        .then((response) => {
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(typeof response.body.TotalQuestPercentCompleted).toBe('number');
            expect(typeof response.body.LastMilestoneIndexCompleted).toBe('number');
        })
});

// Update player's record
test("POST /api/progress", async () => {
    await supertest(app)
        .post("/api/progress")
        .send(inputData)
        .expect(200)
        .then((response) => {
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(typeof response.body.QuestPointsEarned).toBe('number');
            expect(typeof response.body.TotalQuestPercentCompleted).toBe('number');
        })
});

// Exception case - Update player's record without request body
test("POST /api/progress", async () => {
    await supertest(app)
        .post("/api/progress")
        .send()
        .expect(400)
        .then((response) => {
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(typeof response.body.message).toBe('string');
        })
});

// if player's record not exist, then create new player's record
test("POST /api/progress", async () => {
    await supertest(app)
        .post("/api/progress")
        .send(newPlayerData)
        .expect(200)
        .then((response) => {
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(typeof response.body.QuestPointsEarned).toBe('number');
            expect(typeof response.body.TotalQuestPercentCompleted).toBe('number');
        })
});
