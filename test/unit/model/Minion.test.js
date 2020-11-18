// Imports for internal dependencies
const { expect } = require('chai');
const Minion = require('../../../model/Minion');

require('dotenv').config();
jest.mock('../../../db/connect');

beforeEach(() => {
    Minion.find = jest.fn().mockResolvedValue({
        _id: '123',
        name: 'Ben',
        __v: 0
    });
});

describe('Mongoose Minion Model', () => {
    it('Testing payload', async (done) => {
        const minion = await Minion.find();
        expect(minion._id).to.equal('123');
        expect(minion.name).to.equal('Ben');
        expect(minion.__v).to.equal(0);
        done();
    });
});