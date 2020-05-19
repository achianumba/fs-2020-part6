const SET_FILTER = 'SET_FILTER';
const initialState = 'ALL';

export const filterAnecdotes = (filter) => ({
    type: SET_FILTER,
    filter: filter
});

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_FILTER: return action.filter;
        default: return state;
    }
}

export default filterReducer;