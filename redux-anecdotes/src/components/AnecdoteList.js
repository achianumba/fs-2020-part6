import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { voteNotification } from "../reducers/notificationReducer";
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
    const anecdote = anecdotes.find((x) => x.id === id);
    anecdote.votes = anecdote.votes + 1;
    dispatch(voteAnecdote(id, anecdote));

    dispatch(voteNotification(anecdote.content));
  };

  const filter = (e) => {
    e.preventDefault();
    dispatch(filterAnecdotes(e.target.value));
  };

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

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
