const VOTE_NOTIFICATON  = 'VOTE_NOTIFICATION';
const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
const RESET_NOTIFICATION = '';

const reset = (duration, dispatch) => {
    setTimeout(() => {
        dispatch({
            type: RESET_NOTIFICATION
        });
    }, duration * 1000);
}

export const voteNotification = (data, duration = 5) => async (dispatch) => {
    dispatch({
        type: VOTE_NOTIFICATON,
        data
    });

    reset(duration, dispatch);
}

export const createNotification = (data, duration = 5) => async (dispatch) => {
    dispatch({
        type: CREATE_NOTIFICATION,
        data
    });

    reset(duration, dispatch);
}

export const resetNotification = () => ({ type: RESET_NOTIFICATION });

const notificationReducer = (state = "", action) => {
    switch(action.type) {
        case VOTE_NOTIFICATON: return `You voted "${ action.data }"`;

        case CREATE_NOTIFICATION: return `You created an anecdote: "${ action.data }"`;

        case RESET_NOTIFICATION: return "";
        default: return state
    }
}

export default notificationReducer;