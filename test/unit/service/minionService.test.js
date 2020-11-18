// Imports for external dependencies
const { expect } = require('chai');

// Imports for internal dependencies
const Minion = require('../../../model/Minion');
const { uniqueMinions } = require('../../../service/minionService');
const minionsDatabaseResponse = require('../../mockedResponses/db/minions');
jest.mock('../../../db/connect');

beforeEach(() => {
    Minion.find = jest.fn().mockResolvedValue(minionsDatabaseResponse);
});

describe('Minion Service', () => {
    it('Testing payload', async (done) => {
        const uniqueMinionsReturnValue = await uniqueMinions();
        let sum = 0;
        Object.keys(uniqueMinionsReturnValue).forEach((tavernTier) => {
            sum += uniqueMinionsReturnValue[tavernTier].length;
        });
        const expectedMinionTotal = await Minion.find();
        expect(sum).to.equal(expectedMinionTotal.length);
        done();
    });
});