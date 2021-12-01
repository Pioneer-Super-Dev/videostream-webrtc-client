import {
    ADD_BROADCASTER,
    REMOVE_ALERT,
    REMOVE_BROADCASTER
  } from '../actions/types';
  
const initialState = [];

function broadcastReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case ADD_BROADCASTER:
            return [...state, payload];
        case REMOVE_BROADCASTER:
            return state.filter((broadcaster) => broadcaster.id !== payload);
        default:
            return state;
    }
}

export default broadcastReducer;