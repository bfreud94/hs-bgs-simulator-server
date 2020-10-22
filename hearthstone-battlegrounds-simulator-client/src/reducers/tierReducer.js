import { SET_TIER } from '../actions/types';

const initialState = 1;

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TIER:
            if (action.payload.tier === 0) {
                return 1;
            } else if (action.payload.tier === 7) {
                return 6;
            } else {
                return action.payload.tier;
            }
        default:
            return state;
    }
}