import { combineReducers } from 'redux';
import poolReducer from './poolReducer';
import rerollReducer from './rerollReducer';
import tierReducer from './tierReducer';

export default combineReducers({
    tier: tierReducer,
    pool: poolReducer,
    currentRoll: rerollReducer
});