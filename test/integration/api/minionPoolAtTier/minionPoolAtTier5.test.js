// Imports for external dependencies
const request = require('supertest')('http://localhost:8000/hearthstone-battlegrounds-simulator');
const { expect } = require('chai');
const fs = require('fs');
const nock = require('nock');
const path = require('path');

const tierFiveMinions = [
    'Annihilan Battlemaster',
    'Baron Rivendare',
    'Brann Bronzebeard',
    'Cap\'n Hoggarr',
    'Deadly Spore',
    'Ironhide Direhorn',
    'Junkbot',
    'King Bagurgle',
    'Lightfang Enforcer',
    'Mal\'Ganis',
    'Mama Bear',
    'Murozond',
    'Nat Pagle, Extreme Angler',
    'Nomi, Kitchen Nightmare',
    'Razorgore, the Untamed',
    'Seabreaker Goliath',
    'Sneed\'s Old Shredder',
    'Strongshell Scavenger',
    'Tavern Tempest',
    'Voidlord'
];

const tierFiveCopies = 9;

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../../../mockedResponses/minionPoolAtTier/minionPoolAtTier5.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000/hearthstone-battlegrounds-simulator')
        .get('/api/minionPoolAtTier?tier=5')
        .reply(200, json);
});

// Integration test for Minion Pool API
// Tier 5 Testing
describe('Minions at Tier 5', () => {
    it('Total Minions', (done) => {
        request.get('/api/minionPoolAtTier?tier=5').end((err, response) => {
            // Verify 200 Status
            expect(response.status).to.equal(200);
            // Verify response headers
            expect(Object.keys(response.body).length).to.equal(1);
            expect(Object.keys(response.body)[0]).to.equal('minions');
            const { minions } = response.body;
            tierFiveMinions.forEach((minion) => {
                const totalMinionCopies = minions.filter((minionCopy) => minion === minionCopy.minionName).length;
                expect(totalMinionCopies).to.equal(tierFiveCopies);
            });
            done();
        });
    });
});