const VOTE_ANECDOTE = 'VOTE';
const CREATE_ANECDOTE = 'CREATE_ANECDOTE';
const INIT_ANECDOTES = 'INIT_ANECDOTES';

export const voteAnecdote = (id) => ({
  type: VOTE_ANECDOTE,
  id
});

export const createAnecdote = (anecdote) => ({
  type: CREATE_ANECDOTE,
  data: anecdote
});

export const initializeAnecdotes = (anecdotes) => ({
  type: INIT_ANECDOTES,
  data: anecdotes
});


const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case INIT_ANECDOTES:
      return action.data;

    case VOTE_ANECDOTE:
      const anecdoteId = action.id;
      const anecdote = state.find(({ id }) => id === anecdoteId);
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
      const removeAnecdote = state.filter(({ id }) => id !== anecdoteId);
      const updatedState = [...removeAnecdote, updatedAnecdote].sort((x, y) => x.votes < y.votes);
      
      return updatedState;
    
    case CREATE_ANECDOTE: return [...state, action.data ].sort((x, y) => x.votes < y.votes);

    default: return state;
  }
}

export default anecdoteReducer;