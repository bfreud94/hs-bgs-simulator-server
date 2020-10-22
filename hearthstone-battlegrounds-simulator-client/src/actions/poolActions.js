import { ADD_MINION, ADD_TAVERN_MINIONS_TO_POOL, REMOVE_TAVERN_MINIONS_FROM_POOL, GET_UNIQUE_MINIONS, REMOVE_MINION, UPDATE_POOL } from './types';
import { getCurrentRoll } from './reRollActions';
import store from '../store';

const serverUri = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:8000' : '';

export const uniqueMinions = () => async (dispatch) => {
    const uniqueMinions = await (await fetch(`${serverUri}/hearthstone-battlegrounds-simulator/api/minions`)).json();
    dispatch({
        type: GET_UNIQUE_MINIONS,
        payload: uniqueMinions.minions
    });
};

export const addTavernMinionsToPool = (tier) => async (dispatch) => {
    const pool = await (await fetch(`${serverUri}/hearthstone-battlegrounds-simulator/api/minionsAtTier?tier=${tier}`)).json();
    dispatch({
        type: ADD_TAVERN_MINIONS_TO_POOL,
        payload: pool.minions
    });
    dispatch(getCurrentRoll(tier));
};

export const removeTavernMinionsFromPool = (tier) => (dispatch) => {
    dispatch({
        type: REMOVE_TAVERN_MINIONS_FROM_POOL,
        payload: {
            minionPool: store.getState().pool.minionPool,
            tier
        }
    });
};

export const updatePool = (updatedPool) => (dispatch) => {
    dispatch({
        type: UPDATE_POOL,
        payload: {
            updatedPool,
            lastRoll: store.getState().currentRoll.minions,
            tier: store.getState().tier
        }
    });
};

export const removeMinion = (minionToRemove) => (dispatch) => {
    dispatch({
        type: REMOVE_MINION,
        payload: {
            minionToRemove
        }
    });
};

export const addMinion = (minionToAdd, tier) => (dispatch) => {
    dispatch({
        type: ADD_MINION,
        payload: {
            minionToAdd,
            tier
        }
    });
};