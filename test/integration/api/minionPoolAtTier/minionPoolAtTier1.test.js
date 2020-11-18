// Imports for external dependencies
const request = require('supertest')('http://localhost:8000/hearthstone-battlegrounds-simulator');
const { expect } = require('chai');
const fs = require('fs');
const nock = require('nock');
const path = require('path');

const tierOneMinions = [
    'Alleycat',
    'Deck Swabbie',
    'Scallywag',
    'Dragonspawn Lieutenant',
    'Fiendish Servant',
    'Micro Machine',
    'Micro Mummy',
    'Murloc Tidecaller',
    'Murloc Tidehunter',
    'Red Whelp',
    'Refreshing Anomaly',
    'Righteous Protector',
    'Rockpool Hunter',
    'Scavenging Hyena',
    'Sellemental',
    'Vulgar Homunculus',
    'Wrath Weaver'
];

const tierOneCopies = 16;

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../../mockedResponses/minionPoolAtTier/minionPoolAtTier1.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000/hearthstone-battlegrounds-simulator')
        .get('/api/minionPoolAtTier?tier=1')
        .reply(200, json);
});

// Integration test for Minion Pool API
// Tier 1 Testing
describe('Minions at Tier 1', () => {
    it('Total Minions', (done) => {
        request.get('/api/minionPoolAtTier?tier=1').end((err, response) => {
            // Verify 200 Status
            expect(response.status).to.equal(200);
            // Verify response headers
            expect(Object.keys(response.body).length).to.equal(1);
            expect(Object.keys(response.body)[0]).to.equal('minions');
            const { minions } = response.body;
            tierOneMinions.forEach((minion) => {
                const totalMinionCopies = minions.filter((minionCopy) => minion === minionCopy.minionName).length;
                expect(totalMinionCopies).to.equal(tierOneCopies);
            });
            done();
        });
    });
});