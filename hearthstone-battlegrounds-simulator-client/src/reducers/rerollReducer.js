import { GET_CURRENT_ROLL } from '../actions/types';

const initialState = {
    minions: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_ROLL:
            return {
                ...state,
                minions: action.payload
            };
        default:
            return state;
    }
}