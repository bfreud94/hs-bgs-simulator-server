/* eslint-disable no-case-declarations */
import { ADD_MINION, ADD_TAVERN_MINIONS_TO_POOL, REMOVE_TAVERN_MINIONS_FROM_POOL, GET_UNIQUE_MINIONS, REMOVE_MINION, UPDATE_POOL } from '../actions/types';

const initialState = {
    uniqueMinions: [],
    minionPool: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_UNIQUE_MINIONS:
            return {
                ...state,
                uniqueMinions: action.payload
            };
        case ADD_TAVERN_MINIONS_TO_POOL:
            return {
                ...state,
                minionPool: [...state.minionPool, ...action.payload]
            };
        case REMOVE_TAVERN_MINIONS_FROM_POOL:
            return {
                ...state,
                minionPool: action.payload.minionPool.filter((minion) => minion.tier <= action.payload.tier)
            };
        case UPDATE_POOL:
            const { updatedPool } = action.payload;
            const lastRoll = action.payload.lastRoll.filter((minion) => minion.tier <= action.payload.tier);
            return {
                ...state,
                minionPool: [...updatedPool, ...lastRoll]
            };
        case REMOVE_MINION:
            const { minionToRemove } = action.payload;
            const minions = state.minionPool;
            minions.splice(minions.findIndex((minion) => minion.minionName === minionToRemove), 1);
            return {
                ...state,
                minions
            };
        case ADD_MINION:
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
        default:
            return state;
    }
}