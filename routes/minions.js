// Imports for external dependencies
const express = require('express');
const router = express.Router();

// Imports for internal dependencies
const { uniqueMinions, minionPoolAtTier, getMinion } = require('../service/minionService');

router.get(('/uniqueMinions'), async (request, response) => {
    const minions = await uniqueMinions();
    response.send({
        minions
    });
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