// Imports for external dependencies
const express = require('express');
const router = express.Router();

// Imports for internal dependencies
const { uniqueMinions, minionPoolAtTier } = require('../service/minionService');

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

module.exports = router;