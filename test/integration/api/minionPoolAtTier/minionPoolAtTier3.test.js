// Imports for external dependencies
const request = require('supertest')('http://localhost:8000');
const { expect } = require('chai');
const fs = require('fs');
const nock = require('nock');
const path = require('path');

const tierThreeMinions = [
    'Arcane Assistant',
    'Bloodsail Cannoneer',
    'Bronze Warden',
    'Coldlight Seer',
    'Crowd Favorite',
    'Crystalweaver',
    'Deflect-o-Bot',
    'Felfin Navigator',
    'Hangry Dragon',
    'Houndmaster',
    'Imp Gang Boss',
    'Iron Sensei',
    'Infested Wolf',
    'Khadgar',
    'Monstrous Macaw',
    'Piloted Shredder',
    'Rat Pack',
    'Replicating Menace',
    'Salty Looter',
    'Screwjank Clunker',
    'Shifter Zerus',
    'Soul Juggler',
    'Southsea Strongarm',
    'Stasis Elemental',
    'The Beast',
    'Crackling Cyclone',
    'Twilight Emissary'
];

const tierThreeCopies = 13;

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../../../mockedResponses/minionPoolAtTier/minionPoolAtTierThree.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000')
        .get('/api/minionPoolAtTier?tier=3')
        .reply(200, json);
});

// Integration test for Minion Pool API
// Tier 3 Testing
describe('Minions at Tier 3', () => {
    it('Total Minions', (done) => {
        request.get('/api/minionPoolAtTier?tier=3').end((err, response) => {
            // Verify 200 Status
            expect(response.status).to.equal(200);
            // Verify response headers
            expect(Object.keys(response.body).length).to.equal(1);
            expect(Object.keys(response.body)[0]).to.equal('minions');
            const { minions } = response.body;
            tierThreeMinions.forEach((minion) => {
                const totalMinionCopies = minions.filter((minionCopy) => minion === minionCopy.minionName).length;
                expect(totalMinionCopies).to.equal(tierThreeCopies);
            });
            done();
        });
    });
});