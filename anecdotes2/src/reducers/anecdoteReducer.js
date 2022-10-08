import { createSlice } from "@reduxjs/toolkit";

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

const initialState = [
  {
    content: "This is an the first anecdote in the initial state",
    votes: 45,
    id: 345678,
  },
  {
    content:
      "This is the second anecdote in the inital state of the anecdote db",
    votes: 34,
    id: 673245,
  },
];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      const newAnecdote = { content, votes: 0, id: generateId() };
      return state.concat(newAnecdote);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const existingAnecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...existingAnecdote,
        votes: existingAnecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      );
    },
    sortAnecdoteList(state, action) {
      return state.slice().sort((a, b) => a.votes - b.votes);
    },
  },
});

export const { voteAnecdote, createAnecdote, sortAnecdoteList } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
