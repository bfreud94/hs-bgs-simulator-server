const fs = require('fs');

const minionsAvailable = () => {
    let minionsByTier = {1: [], 2: [], 3: [], 4: [], 5: [], 6: []};
    for(let tier = 1; tier <= 6; tier++) {
        const numberToWord = {1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six'};
        const minions = fs.readdirSync(`${__dirname}\\assets\\img\\Tier${numberToWord[tier]}`);
        minionsByTier[tier] = minions.map((minion) => minion.substring(0, minion.length - 4));
    }
    return minionsByTier;
}

const formatMinionName = (minionName) => {
    return minionName === 'FoeReaper4000' ? 'Foe Reaper 4000' : minionName.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
}

// react
const limitOfMinionsPerTier = () => {
    return {
        1: 3,
        2: 4,
        3: 4,
        4: 5,
        5: 5,
        6: 6
    }
}

const copiesOfMinionsPerTier = () => {
    return {
        1: 16,
        2: 15,
        3: 13,
        4: 11,
        5: 9,
        6: 7
    }
}

// react
const minionPool = () => {
    const minions = minionsAvailable();
    const minionsPerTier = copiesOfMinionsPerTier();
    let minionPool = {1: [], 2: [], 3: [], 4: [], 5: [], 6: []};
    for(let tier = 1; tier <= 6; tier++) {
        minions[tier].forEach((minion) => {
            for(let copy = 1; copy <= minionsPerTier[tier]; copy++) {
                minionPool[tier].push(minion);
            }
        });
    }
    return minionPool;
}

module.exports = {
    minionPool,
    limitOfMinionsPerTier,
    formatMinionName,
    copiesOfMinionsPerTier: copiesOfMinionsPerTier
}