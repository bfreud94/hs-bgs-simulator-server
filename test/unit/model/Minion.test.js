// Imports for internal dependencies
// Imports for external dependencies
const { expect } = require('chai');

// Imports for internal dependencies
const Minion = require('../../../model/Minion');
const alleycat = require('../../mockedResponses/db/alleycat');

require('dotenv').config();
jest.mock('../../../db/connect');

beforeEach(() => {
    Minion.find = jest.fn().mockResolvedValue(alleycat);
});

describe('Mongoose Minion Model', () => {
    it('Testing payload', async (done) => {
        const minion = await Minion.find();
        const keys = Object.keys(minion);
        expect(keys.includes('_id')).to.equal(true);
        expect(keys.includes('minionName')).to.equal(true);
        expect(keys.includes('tier')).to.equal(true);
        expect(keys.includes('tribe')).to.equal(true);
        expect(keys.includes('imageLocation')).to.equal(true);
        expect(keys.includes('__v')).to.equal(true);
        done();
    });
});