import { getAll, newAnecdote, incrementVotes } from "../services/anecdotes";

const VOTE_ANECDOTE = "VOTE_ANECDOTE";
const CREATE_ANECDOTE = "CREATE_ANECDOTE";
const INIT_ANECDOTES = "INIT_ANECDOTES";

export const voteAnecdote = (id, update) => async (dispatch) => {
  try {
    const updatedAnecdote = await incrementVotes(id, update);
    dispatch({
      type: VOTE_ANECDOTE,
      data: updatedAnecdote.data
    });
  } catch(err) {
    console.error(err.message);
  }
};

export const createAnecdote = (anecdote) => async (dispatch) => {
  try {
    const response = await newAnecdote(anecdote);
    dispatch({
      type: CREATE_ANECDOTE,
      data: response.data,
    })
  } catch(err) {
    console.error(err.message);
  }
};

//notice that initializeAnecdotes returns a function
export const initializeAnecdotes = () => async (dispatch) => {
  try {
    const anecdotes = await getAll();
    dispatch({
      type: INIT_ANECDOTES,
      data: anecdotes.data,
    });

  } catch(err) {
    console.error(err.message);
  }
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case INIT_ANECDOTES:
      return action.data;

    case VOTE_ANECDOTE:
      const anecdoteId = action.data.id;
      const likedAnecdote = state.find(({ id }) => id === anecdoteId);
      const removeAnecdote = state.filter(({ id }) => id !== anecdoteId);
      const updatedState = [...removeAnecdote, likedAnecdote].sort(
        (x, y) => x.votes < y.votes
      );

      return updatedState;

    case CREATE_ANECDOTE:
      return [...state, action.data].sort((x, y) => x.votes < y.votes);

    default:
      return state;
  }
};

export default anecdoteReducer;