// Imports for external dependencies
const { expect } = require('chai');

// Imports for internal dependencies
const Minion = require('../../../model/Minion');
const { uniqueMinions, minionPoolAtTier } = require('../../../service/minionService');

// Mocked Responses
const minionsDatabaseResponse = require('../../mockedResponses/db/minions');
const minionPoolAtTierOne = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierOne');
const minionPoolAtTierTwo = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierTwo');
const minionPoolAtTierThree = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierThree');
const minionPoolAtTierFour = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierFour');
const minionPoolAtTierFive = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierFive');
const minionPoolAtTierSix = require('../../mockedResponses/minionPoolAtTier/minionPoolAtTierSix');

// Mock jest
jest.mock('../../../db/connect');

beforeEach(() => {
    Minion.find = jest.fn().mockResolvedValue(minionsDatabaseResponse);
});

describe('Minion Service', () => {
    it('Unique Minions', async (done) => {
        const uniqueMinionsReturnValue = await uniqueMinions();
        let sum = 0;
        Object.keys(uniqueMinionsReturnValue).forEach((tavernTier) => {
            sum += uniqueMinionsReturnValue[tavernTier].length;
        });
        const expectedMinionTotal = await Minion.find();
        expect(sum).to.equal(expectedMinionTotal.length);
        done();
    });
    it('Minion Pool at Tier 1', async (done) => {
        const minionPoolAtTierOneReturnValue = await minionPoolAtTier('1');
        expect(minionPoolAtTierOneReturnValue.length).to.equal(minionPoolAtTierOne.minions.length);
        done();
    });
    it('Minion Pool at Tier 2', async (done) => {
        const minionPoolAtTierTwoReturnValue = await minionPoolAtTier('2');
        expect(minionPoolAtTierTwoReturnValue.length).to.equal(minionPoolAtTierTwo.minions.length);
        done();
    });
    it('Minion Pool at Tier 3', async (done) => {
        const minionPoolAtTierThreeReturnValue = await minionPoolAtTier('3');
        expect(minionPoolAtTierThreeReturnValue.length).to.equal(minionPoolAtTierThree.minions.length);
        done();
    });
    it('Minion Pool at Tier 4', async (done) => {
        const minionPoolAtTierFourReturnValue = await minionPoolAtTier('4');
        expect(minionPoolAtTierFourReturnValue.length).to.equal(minionPoolAtTierFour.minions.length);
        done();
    });
    it('Minion Pool at Tier 5', async (done) => {
        const minionPoolAtTierFiveReturnValue = await minionPoolAtTier('5');
        expect(minionPoolAtTierFiveReturnValue.length).to.equal(minionPoolAtTierFive.minions.length);
        done();
    });
    it('Minion Pool at Tier 6', async (done) => {
        const minionPoolAtTierSixReturnValue = await minionPoolAtTier('6');
        expect(minionPoolAtTierSixReturnValue.length).to.equal(minionPoolAtTierSix.minions.length);
        done();
    });
});