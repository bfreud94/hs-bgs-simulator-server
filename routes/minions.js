// Imports for external dependencies
const express = require('express');
const router = express.Router();

// Imports for internal dependencies
const Minion = require('../model/Minion');

router.get(('/minions'), async (request, response) => {
    const minions = await Minion.find();
    const uniqueMinions = {
        1: [], 2: [], 3: [], 4: [], 5: [], 6: []
    };
    minions.forEach((minion) => {
        uniqueMinions[minion.tier].push({
            minionName: minion.minionName,
            tier: minion.tier,
            tribe: minion.tribe,
            imageLocation: minion.imageLocation
        });
    });
    response.send({
        minions: uniqueMinions
    });
});

router.get(('/minionsAtTier'), async (request, response) => {
    const minions = await Minion.find();
    const minionPool = [];
    const amountOfMinionsPerTier = {
        1: 16, 2: 15, 3: 13, 4: 11, 5: 9, 6: 7
    };
    minions.forEach((minion) => {
        for (let copy = 0; copy < amountOfMinionsPerTier[minion.tier]; copy++) {
            if (request.query.tier === minion.tier) {
                minionPool.push({
                    minionName: minion.minionName,
                    tier: minion.tier,
                    tribe: minion.tribe,
                    imageLocation: minion.imageLocation
                });
            }
        }
    });
    response.send({
        minions: minionPool
    });
});

module.exports = router;