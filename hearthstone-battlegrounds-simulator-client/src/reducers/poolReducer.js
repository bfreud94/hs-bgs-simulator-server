import { ADD_MINION, ADD_TAVERN_MINIONS_TO_POOL, ADD_TRIBE, REMOVE_TAVERN_MINIONS_FROM_POOL, GET_UNIQUE_MINIONS, REMOVE_MINION, REMOVE_TRIBE, UPDATE_POOL } from '../actions/types';

const initialState = {
    uniqueMinions: [],
    minionPool: [],
    tribes: ['Beast', 'Demon', 'Dragon', 'Elemental', 'Mech', 'Murloc', 'Neutral', 'Pirate']
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_UNIQUE_MINIONS: {
            return {
                ...state,
                uniqueMinions: action.payload
            };
        } case ADD_TAVERN_MINIONS_TO_POOL:
            const minions = action.payload.filter((minion) => state.tribes.includes(minion.tribe));
            return {
                ...state,
                minionPool: [...state.minionPool, ...minions]
            };
        case REMOVE_TAVERN_MINIONS_FROM_POOL: {
            return {
                ...state,
                minionPool: action.payload.minionPool.filter((minion) => minion.tier <= action.payload.tier)
            };
        } case UPDATE_POOL: {
            const { updatedPool } = action.payload;
            const lastRoll = action.payload.lastRoll.filter((minion) => minion.tier <= action.payload.tier).filter((minion) => state.tribes.includes(minion.tribe));
            return {
                ...state,
                minionPool: [...updatedPool, ...lastRoll]
            };
        } case REMOVE_MINION: {
            const { minionToRemove } = action.payload;
            const minions = state.minionPool;
            minions.splice(minions.findIndex((minion) => minion.minionName === minionToRemove), 1);
            return {
                ...state,
                minions
            };
        } case ADD_MINION: {
            const { minionPool } = state.minionPool;
            const { minionToAdd, tier } = action.payload;
            const amountOfMinionCopies = minionPool.filter((minion) => minion.minionName === minionToAdd).length;
            const amountOfMinionsPerTier = { 1: 16, 2: 15, 3: 13, 4: 11, 5: 9, 6: 7 };
            if (amountOfMinionCopies < amountOfMinionsPerTier[tier]) {
                minionPool.push({ minionName: minionToAdd, tier });
            }
            return {
                ...state,
                minions: minionPool
            };
        } case ADD_TRIBE: {
            const { tribe, tier } = action.payload;
            const minionsToAdd = [];
            for(let i = 1; i <= tier; i++) {
                minionsToAdd.push(...state.uniqueMinions[i].filter((minion) => minion.tribe === tribe));
            }
            const minionsPerTier = { 1: 16, 2: 15, 3: 13, 4: 11, 5: 9, 6: 7 };
            const minionCopies = [];
            minionsToAdd.forEach((minion) => {
                for(let i = 0; i < minionsPerTier[minion.tier]; i++) {
                    minionCopies.push(minion);
                }
            });
            return {
                ...state,
                tribes: [...state.tribes, tribe],
                minionPool: [...state.minionPool, ...minionCopies]

            };
        } case REMOVE_TRIBE: {
            const updatedTribes = state.tribes.filter((tribe) => tribe !== action.payload);
            const minionPool = state.minionPool.filter((minion) => minion.tribe !== action.payload);
            return {
                ...state,
                tribes: updatedTribes,
                minionPool
            }
        } default:
            return state;
    }
}