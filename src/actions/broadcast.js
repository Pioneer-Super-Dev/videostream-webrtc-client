import { ADD_BROADCASTER, REMOVE_BROADCASTER } from "./types";

export const addBroadcaster = (broadcasterData) => dispatch => {
    dispatch({
        type: ADD_BROADCASTER,
        payload: broadcasterData
    });
};

export const removeBroadcaster = (broadcasterData) => dispatch => {
    dispatch({
        type: REMOVE_BROADCASTER,
        payload: broadcasterData
    });
};
