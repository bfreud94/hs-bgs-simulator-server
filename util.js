const formatMinionName = (minionName) => {
    // Replace of with of + any capital letter
    if (minionName === 'SpawnOfN\'Zoth') {
        return 'Spawn of N\'Zoth';
    }
    if (minionName === 'StewardOfTime') {
        return 'Steward of Time';
    }
    if (minionName === 'DefenderOfArgus') {
        return 'Defender of Argus';
    }
    if (minionName === 'HeraldOfFlame') {
        return 'Herald of Flame';
    }
    if (minionName === 'BolvarFireblood') {
        return 'Bolvar, Fireblood';
    }
    if (minionName === 'NatPagleExtremeAngler') {
        return 'Nat Pagle, Extreme Angler';
    }
    if (minionName === 'NomiKitchenNightmare') {
        return 'Nomi, Kitchen Nightmare';
    }
    if (minionName === 'RazorgoreTheUntamed') {
        return 'Razorgore, the Untamed';
    }
    if (minionName === 'SneedsOldShredder') {
        return 'Sneed\'s Old Shredder';
    }
    if (minionName === 'KalecgosArcaneAspect') {
        return 'Kalecgos, Arcane Aspect';
    }
    if (minionName === 'Lil\'Rag') {
        return 'Lil\' Rag';
    }
    if (minionName === 'KalecgosArcaneAspect') {
        return 'Kalecgos, Arcane Aspect';
    }
    if (minionName === 'GoldrinnTheGreatWolf') {
        return 'Goldrinn, the Great Wolf';
    }
    if (minionName === 'NadinaTheRed') {
        return 'Nadina the Red';
    }
    // Should work with default regex
    if (minionName === 'FoeReaper4000') {
        return 'Foe Reaper 4000';
    }
    return minionName.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
};

module.exports = {
    formatMinionName
};