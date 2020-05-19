const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const VOTE_ANECDOTE = 'VOTE';
const CREATE_ANECDOTE = 'CREATE_ANECDOTE';

export const voteAnecdote = (id) => ({
  type: VOTE_ANECDOTE,
  id
});

export const createAnecdote = (anecdote) => ({
  type: CREATE_ANECDOTE,
  data: anecdote
});


const anecdoteReducer = (state = initialState, action) => {
  switch(action.type) {
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