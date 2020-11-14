// Imports for external dependencies
const request = require('supertest')('http://localhost:8000/hearthstone-battlegrounds-simulator');
const { expect } = require('chai');
const fs = require('fs');
const nock = require('nock');
const path = require('path');

// for each tier
// verify that all minions are there
// for each minion, verify the path and tier

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../mockedResponses/uniqueMinions.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000/hearthstone-battlegrounds-simulator')
        .get('/api/uniqueMinions')
        .reply(200, json);
});

const numberToStringMap = () => ({
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six'
});

const totalMinionsMap = () => ({
    1: 17,
    2: 22,
    3: 27,
    4: 20,
    5: 20,
    6: 15
});

describe('Unique Minion API', () => {
    const totalMinions = totalMinionsMap();
    const numberToString = numberToStringMap();
    it('Total Minions', (done) => {
        request.get('/api/uniqueMinions').end((err, response) => {
            expect(response.status).to.equal(200);
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
    Object.keys(totalMinions).forEach((tavernTier) => {
        it(`Tier ${tavernTier}`, (done) => {
            request.get('/api/uniqueMinions').end((err, response) => {
                expect(response.status).to.equal(200);
                const minions = response.body.minions[tavernTier];
                let sum = 0;
                minions.forEach((minion) => {
                    const { tier, tribe, imageLocation } = minion;
                    const minionName = minion.minionName.replace(/\s/g, '');
                    expect(tier).to.equal(tavernTier);
                    expect(imageLocation).to.equal(`/img/Tier${numberToString[tier]}/${tribe}/${minionName}.png`);
                    sum++;
                });
                expect(minions.length).to.equal(sum);
                done();
            });
        });
    });
});