import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const create = (e) => {
    e.preventDefault();

    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";

    const anecdote = {
      content: content,
      id: Date.now(),
      votes: 0,
    };

    props.createAnecdote(anecdote);
    props.createNotification(content);
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

const mapDispatchToProps = (dispatch) => ({
  createAnecdote: anecdote => {
    dispatch(createAnecdote(anecdote));
  },
  createNotification: data => {
    dispatch(createNotification(data));
  }
});

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
