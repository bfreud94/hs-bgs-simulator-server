// Imports for external dependencies
const request = require('supertest')('http://localhost:8000/hearthstone-battlegrounds-simulator');
const { expect } = require('chai');
const fs = require('fs');
const nock = require('nock');
const path = require('path');

const tierTwoMinions = [
    'Freedealing Gambler',
    'Glyph Guardian',
    'Harvest Golem',
    'Imprisoner',
    'Kaboom Bot',
    'Kindly Grandmother',
    'Metaltooth Leaper',
    'Molten Rock',
    'Murloc Warleader',
    'Nathrezim Overseer',
    'Old Murk-Eye',
    'Pack Leader',
    'Party Elemental',
    'Rabid Saurolisk',
    'Selfless Hero',
    'Southsea Captain',
    'Spawn of N\'Zoth',
    'Steward of Time',
    'Unstable Ghoul',
    'Menagerie Mug',
    'Waxrider Togwaggle',
    'Yo-Ho-Ogre'
];

const tierTwoCopies = 15;

beforeEach(() => {
    const contents = fs.readFileSync(path.resolve(__dirname, '../../mockedResponses/minionPoolAtTier/minionPoolAtTier2.json'));
    const json = JSON.parse(contents);
    nock('http://localhost:8000/hearthstone-battlegrounds-simulator')
        .get('/api/minionPoolAtTier?tier=2')
        .reply(200, json);
});

// Integration test for Minion Pool API
// Tier 2 Testing
describe('Minions at Tier 2', () => {
    it('Total Minions', (done) => {
        request.get('/api/minionPoolAtTier?tier=2').end((err, response) => {
            // Verify 200 Status
            expect(response.status).to.equal(200);
            // Verify response headers
            expect(Object.keys(response.body).length).to.equal(1);
            expect(Object.keys(response.body)[0]).to.equal('minions');
            const { minions } = response.body;
            tierTwoMinions.forEach((minion) => {
                const totalMinionCopies = minions.filter((minionCopy) => minion === minionCopy.minionName).length;
                expect(totalMinionCopies).to.equal(tierTwoCopies);
            });
            done();
        });
    });
});