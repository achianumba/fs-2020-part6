import React, { useEffect } from "react";
import { connect } from "react-redux";
import { voteAnecdote, initializeAnecdotes } from "../reducers/anecdoteReducer";
import { voteNotification } from "../reducers/notificationReducer";
import { filterAnecdotes } from "../reducers/filterReducer";

function AnecdoteList(props) {
  const vote = (id) => {
    const anecdote = props.anecdotes.find((x) => x.id === id);
    anecdote.votes = anecdote.votes + 1;
    props.voteAnecdote(id, anecdote);
    props.voteNotification(anecdote.content);
  };

  const filter = (e) => {
    e.preventDefault();
    props.filterAnecdotes(e.target.value);
  };

  useEffect(() => {
    props.initializeAnecdotes();
  }, []);

  return (
    <>
      <div>
        Filter: <input type="text" onChange={filter} />
      </div>
      {props.anecdotes
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

//map redux state to component's props
const mapStateToProps = ({ anecdotes, filter }) => {
  if (filter === "ALL") {
    return {
      anecdotes,
    };
  }

  return {
    anecdotes: anecdotes.filter(({ content }) => new RegExp(`${filter}`, "gi").test(content))
  }
};

//map redux action creators to component's event handlers
const mapDispatchToProps = dispatch => {
  return {
    initializeAnecdotes: () => {
      dispatch(initializeAnecdotes());
    },
    voteAnecdote: (id, update) => {
      dispatch(voteAnecdote(id, update));
    },
    filterAnecdotes: term => {
      dispatch(filterAnecdotes(term))
    },
    voteNotification: data => {
      dispatch(voteNotification(data));
    }
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdoteList;
