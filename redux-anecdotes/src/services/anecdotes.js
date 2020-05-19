import axios from "axios";

const url = "http://localhost:3001/anecdotes";

export const getAllService = async () => axios.get(url);

export const createAnecdoteService = async (anecdote) => axios.post(url, anecdote);