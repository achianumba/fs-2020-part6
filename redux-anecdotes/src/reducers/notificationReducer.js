const VOTE_NOTIFICATON  = 'VOTE_NOTIFICATION';
const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
const RESET_NOTIFICATION = '';

const reset = (duration, dispatch) => {
    const timerId = setTimeout(() => {
        dispatch({
            type: RESET_NOTIFICATION
        });
    }, duration * 1000);

    dispatch({
        type: 'TIMER_ID',
        id: timerId
    });
}

export const voteNotification = (data, duration = 5) => async (dispatch, getState) => {
    const timerId = getState().message.timerId;
    if (timerId) clearTimeout(timerId); //clear existing timers
    dispatch({
        type: VOTE_NOTIFICATON,
        data
    });
    reset(duration, dispatch);
}

export const createNotification = (data, duration = 5) => async (dispatch, getState) => {
    const timerId = getState().message.timerId;
    if (timerId) clearTimeout(timerId); //clear existing timers
    dispatch({
        type: CREATE_NOTIFICATION,
        data
    });
    reset(duration, dispatch);
}

export const resetNotification = () => ({ type: RESET_NOTIFICATION });

const initialState = {
    message: "",
    timerId: null
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TIMER_ID': return { ...state, timerId: action.id };

        case VOTE_NOTIFICATON:
            return { ...state, message: `You voted "${ action.data }"` };

        case CREATE_NOTIFICATION:
            return { ...state, message: `You created an anecdote "${ action.data }"` };

        case RESET_NOTIFICATION: return { message: '', timerId: null };

        default: return state
    }
}

export default notificationReducer;