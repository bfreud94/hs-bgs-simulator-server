// Imports for external dependencies
const request = require('supertest')('http://localhost:8000');
const { expect } = require('chai');
const fs = require('fs');
const nock = require('nock');
const path = require('path');

const tierSixMinions = [
    'Amalgadon',
    'Dread Admiral Eliza',
    'Foe Reaper 4000',
    'Gentle Djinni',
    'Ghastcoiler',
    'Imp Mama',
    'Kalecgos, Arcane Aspect',
    'Kangor\'s Apprentice',
    'Lieutenant Garr',
    'Lil\' Rag',
    'Maexxna',
    'Nadina the Red',
    'Zapp Slywick',
    'The Tide Razor',
    'Goldrinn, the Great Wolf'
];

const tierSixCopies = 7;

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../../../mockedResponses/minionPoolAtTier/minionPoolAtTierSix.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000')
        .get('/api/minionPoolAtTier?tier=6')
        .reply(200, json);
});

// Integration test for Minion Pool API
// Tier 6 Testing
describe('Minions at Tier 6', () => {
    it('Total Minions', (done) => {
        request.get('/api/minionPoolAtTier?tier=6').end((err, response) => {
            // Verify 200 Status
            expect(response.status).to.equal(200);
            const { minions } = response.body;
            // Verify response headers
            expect(Object.keys(response.body).length).to.equal(1);
            expect(Object.keys(response.body)[0]).to.equal('minions');
            tierSixMinions.forEach((minion) => {
                const totalMinionCopies = minions.filter((minionCopy) => minion === minionCopy.minionName).length;
                expect(totalMinionCopies).to.equal(tierSixCopies);
            });
            done();
        });
    });
});