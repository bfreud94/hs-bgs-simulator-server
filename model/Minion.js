const mongoose = require('mongoose');

const requiredString = {
    type: String,
    required: true
};

const MinionSchema = mongoose.Schema({
    minionName: requiredString,
    tier: requiredString,
    tribe: requiredString,
    imageLocation: requiredString
});

module.exports = mongoose.model('minions', MinionSchema);