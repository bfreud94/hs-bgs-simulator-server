import { SET_TIER } from './types';

export const setTier = (tier) => (dispatch) => {
    dispatch({
        type: SET_TIER,
        payload: {
            tier
        }
    });
};