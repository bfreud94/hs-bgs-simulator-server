const request = require('supertest')('http://localhost:8000/hearthstone-battlegrounds-simulator');
const nock = require('nock');
const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../mockedResponses/uniqueMinions.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000/hearthstone-battlegrounds-simulator')
    .get('/api/uniqueMinions')
    .reply(200, json);
});

describe('Minion API', () => {
    it('Total Minions', (done) => {
        request.get('/api/uniqueMinions').end((err, response) => {
            expect(response.status).to.equal(200);
            const totalMinions = {
                1: 17,
                2: 22,
                3: 27,
                4: 20,
                5: 20,
                6: 15
            };
            const { minions } = response.body;
            let actualSum = 0;
            let expectedSum = 0;
            Object.keys(minions).forEach((tier, index) => {
                const minionsAtCurrentTier = minions[tier].length;
                expect(totalMinions[index + 1]).to.equal(minionsAtCurrentTier);
                expectedSum += minionsAtCurrentTier;
                actualSum += totalMinions[index + 1];
            });
            expect(expectedSum).to.equal(actualSum);
            done();
        });
    });
});