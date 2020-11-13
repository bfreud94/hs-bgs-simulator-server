// Imports for internal dependencies
const Minion = require('../model/Minion');

const uniqueMinions = async () => {
    const minions = await Minion.find();
    const uniqueMinionsObject = {
        1: [], 2: [], 3: [], 4: [], 5: [], 6: []
    };
    minions.forEach((minion) => {
        uniqueMinionsObject[minion.tier].push({
            minionName: minion.minionName,
            tier: minion.tier,
            tribe: minion.tribe,
            imageLocation: minion.imageLocation
        });
    });
    return uniqueMinionsObject;
};

const minionPoolAtTier = async (tier) => {
    const minions = await Minion.find();
    const minionPool = [];
    const amountOfMinionsPerTier = {
        1: 16, 2: 15, 3: 13, 4: 11, 5: 9, 6: 7
    };
    minions.forEach((minion) => {
        for (let copy = 0; copy < amountOfMinionsPerTier[minion.tier]; copy++) {
            if (tier === minion.tier) {
                minionPool.push({
                    minionName: minion.minionName,
                    tier: minion.tier,
                    tribe: minion.tribe,
                    imageLocation: minion.imageLocation
                });
            }
        }
    });
    return minionPool;
};

module.exports = {
    uniqueMinions,
    minionPoolAtTier
};