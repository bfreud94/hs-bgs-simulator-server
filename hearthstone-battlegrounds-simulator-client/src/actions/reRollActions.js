import { GET_CURRENT_ROLL } from './types';
import { updatePool } from './poolActions';
import store from '../store';

export const getCurrentRoll = (tier) => async (dispatch) => {
    const minionPool = store.getState().pool.minionPool.filter((minion) => minion.tier <= tier);
    const minionsPerTier = { 1: 3, 2: 4, 3: 4, 4: 5, 5: 5, 6: 6 };
    let poolSize = minionPool.length;
    const minions = [];
    for (let randomCard = 0; randomCard < minionsPerTier[tier]; randomCard++) {
        const index = Math.floor(Math.random() * poolSize--);
        minions.push({
            minionName: minionPool[index].minionName,
            tier: minionPool[index].tier,
            tribe: minionPool[index].tribe,
            imageLocation: minionPool[index].imageLocation
        });
        minionPool.splice(index, 1);
    }
    dispatch(updatePool(minionPool));
    dispatch({
        type: GET_CURRENT_ROLL,
        payload: minions
    });
};