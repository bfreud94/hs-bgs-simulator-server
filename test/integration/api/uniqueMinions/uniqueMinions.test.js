// Imports for external dependencies
const request = require('supertest')('http://localhost:8000/hearthstone-battlegrounds-simulator');
const { expect } = require('chai');
const fs = require('fs');
const nock = require('nock');
const path = require('path');

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../../../mockedResponses/uniqueMinions/uniqueMinions.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000/hearthstone-battlegrounds-simulator')
        .get('/api/uniqueMinions')
        .reply(200, json);
});

const numberToString = {
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six'
};

const totalMinions = {
    1: 17,
    2: 22,
    3: 27,
    4: 20,
    5: 20,
    6: 15
};

// Integration test for uniqueMinions API
describe('Unique Minion API', () => {
    it('Total Minions', (done) => {
        request.get('/api/uniqueMinions').end((err, response) => {
            // Verify 200 Status
            expect(response.status).to.equal(200);
            // Verify response headers
            expect(Object.keys(response.body).length).to.equal(1);
            expect(Object.keys(response.body)[0]).to.equal('minions');
            const { minions } = response.body;
            let actualSum = 0;
            let expectedSum = 0;
            // For each tavern tier, verify that the total minions is correct
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
    // For each tavern tier, verify that each minion tier and imageLocation are correct
    Object.keys(totalMinions).forEach((tavernTier) => {
        it(`Tier ${tavernTier}`, (done) => {
            request.get('/api/uniqueMinions').end((err, response) => {
                expect(response.status).to.equal(200);
                const minions = response.body.minions[tavernTier];
                let sum = 0;
                minions.forEach((minion) => {
                    const { tier, tribe, imageLocation } = minion;
                    const minionName = minion.minionName.replace(/\s/g, '');
                    // Minion tier equals tavern tier
                    expect(tier).to.equal(tavernTier);
                    // Concatenate tier, tribe, and minionName to verify imageLocation
                    expect(imageLocation).to.equal(`/img/Tier${numberToString[tier]}/${tribe}/${minionName}.png`);
                    sum++;
                });
                expect(totalMinions[tavernTier]).to.equal(sum);
                done();
            });
        });
    });
});