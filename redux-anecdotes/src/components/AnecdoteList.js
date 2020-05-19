import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  voteNotification,
  resetNotification,
} from "../reducers/notificationReducer";
import { filterAnecdotes } from "../reducers/filterReducer";

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    return state.filter === "ALL"
      ? state.anecdotes
      : state.anecdotes.filter(({ content }) =>
          new RegExp(`${state.filter}`, "gi").test(content)
        );
  });

  const vote = (id) => {
    dispatch(voteAnecdote(id));

    const anecdote = anecdotes.find((x) => x.id === id).content;
    dispatch(voteNotification(anecdote));

    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };

  const filter = (e) => {
    e.preventDefault();
    dispatch(filterAnecdotes(e.target.value));
  };

  return (
    <>
      <div>
        Filter: <input type="text" onChange={filter} />
      </div>
      {anecdotes
        .sort((x, y) => x > y)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
}

export default AnecdoteList;
