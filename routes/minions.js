// Imports for external dependencies
const express = require('express');
const fs = require('fs');
const router = express.Router();

// Imports for internal dependencies
const Minion = require('../model/Minion');
const util = require('../util');

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

router.post(('/minions'), async (request, response) => {
    const numberToWord = {
        1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six'
    };
    const tribes = ['Beast', 'Demon', 'Dragon', 'Elemental', 'Mech', 'Murloc', 'Neutral', 'Pirate'];
    const promises = [];
    for (let tier = 1; tier <= 6; tier++) {
        tribes.forEach((tribe) => {
            const minionsInTier = fs.readdirSync(`${__dirname}\\..\\assets\\img\\Tier${numberToWord[tier]}\\${tribe}`);
            minionsInTier.forEach((minion) => {
                const minionPromise = new Minion({
                    minionName: util.formatMinionName(minion.substring(0, minion.length - 4)),
                    tier,
                    tribe,
                    imageLocation: `/img/Tier${numberToWord[tier]}/${tribe}/${minion}`
                });
                const savedMinionPromise = minionPromise.save();
                promises.push(savedMinionPromise);
            });
        });
    }
    const minions = await Promise.all(promises);
    response.send({
        minions
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