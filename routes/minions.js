// Imports for external dependencies
const express = require('express');
const router = express.Router();

// Imports for internal dependencies
const { uniqueMinions, minionPoolAtTier, getMinion, addMinion } = require('../service/minionService');

router.get(('/uniqueMinions'), async (request, response) => {
    const minions = await uniqueMinions();
    response.send({
        minions
    });
});

router.post(('/addMinion'), async (request, response) => {
    const { minionName, tier, tribe, imageLocation } = request.body;
    const minion = await getMinion(minionName);
    if (minion) {
        response.send({
            error: 'Minion already exists'
        });
    } else {
        const addedMinion = await addMinion({minionName, tier, tribe, imageLocation});
        if (addedMinion) {
            response.send(addedMinion);
        } else {
            response.send({
                error: 'Failed to add minion'
            });
        }
    }
});


router.get(('/minionPoolAtTier'), async (request, response) => {
    const minions = await minionPoolAtTier(request.query.tier);
    response.send({
        minions
    });
});

router.get(('/minion'), async (request, response) => {
    const minion = await getMinion(request.query.name);
    response.send(
        minion
    );
});

module.exports = router;