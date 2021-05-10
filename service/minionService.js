// Imports for internal dependencies
const Minion = require('../model/Minion');
const { amountOfMinionsPerTier, createObjectWithEmptyArrays } = require('../util/index');

const uniqueMinions = async () => {
    const minions = await Minion.find();
    const uniqueMinionsObject = createObjectWithEmptyArrays(6);
    minions.forEach(({ minionName, tier, tribe, imageLocation }) => {
        uniqueMinionsObject[tier].push({
            minionName,
            tier,
            tribe,
            imageLocation
        });
    });
    return uniqueMinionsObject;
};

const minionPoolAtTier = async (inTier) => {
    const minions = await Minion.find();
    const minionPool = [];
    minions.forEach(({ minionName, tier, tribe, imageLocation }) => {
        for (let copy = 0; copy < amountOfMinionsPerTier[tier]; copy++) {
            if (inTier === tier) {
                minionPool.push({
                    minionName,
                    tier,
                    tribe,
                    imageLocation
                });
            }
        }
    });
    return minionPool;
};

const getMinion = async (name) => {
    const minion = await Minion.findOne({ minionName: name });
    const { minionName, tier, tribe, imageLocation } = minion;
    return {
        minionName,
        tier,
        tribe,
        imageLocation
    };
};

module.exports = {
    uniqueMinions,
    minionPoolAtTier,
    getMinion
};