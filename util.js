const formatMinionName = (minionName) => (
    minionName === 'FoeReaper4000' ? 'Foe Reaper 4000' : minionName.replace(/([a-z])([A-Z])/g, '$1 $2').trim()
);

module.exports = {
    formatMinionName
};