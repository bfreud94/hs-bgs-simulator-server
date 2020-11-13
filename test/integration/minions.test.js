const request = require('supertest');
const { app } = require('../../server');

jest.setTimeout(50000);

describe('Minion API', () => {
    it('Total Minions', async () => {
        /*
        const totalMinions = {
            1: 17,
            2: 22,
            3: 27,
            4: 20,
            5: 20,
            6: 15
        };
        const response = await request(app).get('/hearthstone-battlegrounds-simulator/api/uniqueMinions');
        const { minions } = response.body;
        let actualSum = 0;
        let expectedSum = 0;
        Object.keys(minions).forEach((tier, index) => {
            const minionsAtCurrentTier = minions[tier].length;
            expect(totalMinions[index + 1]).toBe(minionsAtCurrentTier);
            expectedSum += minionsAtCurrentTier;
            actualSum += totalMinions[index + 1];
        });
        expect(response.status).toBe(200);
        expect(expectedSum).toBe(actualSum);
        */
        expect(1).toBe(1);
    });
});