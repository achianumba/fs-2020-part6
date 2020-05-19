import { GOOD, OKAY, BAD } from './actions';

const initialState = {
    good: 0,
    okay: 0,
    bad: 0
}


const reducer = (state = initialState,  action) => {
    switch(action.type) {
        case GOOD: return { ...state, good: state.good + 1};
        case OKAY: return { ...state, okay: state.okay + 1};
        case BAD: return { ...state, bad: state.bad + 1 };
        case 'ZERO': return state;
        default: return state;
    }
}

export default reducer;