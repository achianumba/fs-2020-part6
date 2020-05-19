import axios from "axios";

const url = "http://localhost:3001/anecdotes";

export const getAll = () => axios.get(url);

export const newAnecdote = (anecdote) => axios.post(url, anecdote);

export const incrementVotes = (id, update) => axios.put(`${url}/${id}`, update);