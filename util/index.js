const amountOfMinionsPerTier = {
    1: 16, 2: 15, 3: 13, 4: 11, 5: 9, 6: 7
};

const createObjectWithEmptyArrays = (n) => {
    const obj = {};
    for (let i = 1; i <= n; i++) {
        obj[i] = [];
    }
    return obj;
};

module.exports = {
    amountOfMinionsPerTier,
    createObjectWithEmptyArrays
};