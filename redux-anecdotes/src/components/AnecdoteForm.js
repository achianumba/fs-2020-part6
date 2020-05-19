import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote} from '../reducers/anecdoteReducer'
import { createNotification, resetNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const create = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";

    const anecdote = {
      content: content,
      id: Date.now(),
      votes: 0,
    };

    dispatch(createAnecdote(anecdote));

    dispatch(createNotification(content));

    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);
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