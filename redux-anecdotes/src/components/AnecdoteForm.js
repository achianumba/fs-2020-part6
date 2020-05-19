import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (e) => {
    e.preventDefault();

    const anecdote = {
      content: e.target.anecdote.value,
      id: Date.now(),
      votes: 0,
    };

    dispatch(createAnecdote(anecdote));

    e.target.anecdote.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;