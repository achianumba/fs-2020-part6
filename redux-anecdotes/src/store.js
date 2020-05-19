import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    anecdotes: anecdoteReducer,
    message: notificationReducer,
    filter: filterReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;