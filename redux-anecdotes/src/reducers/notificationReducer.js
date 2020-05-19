const VOTE_NOTIFICATON  = 'VOTE_NOTIFICATION';
const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION';
const RESET_NOTIFICATION = '';

export const voteNotification = (data) => ({
    type: VOTE_NOTIFICATON,
    data
});

export const createNotification = (data) => ({
    type: CREATE_NOTIFICATION,
    data
});

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