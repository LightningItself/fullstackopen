import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [
  { content: "This is the first anecdote", votes: 0 },
  { content: "This is the second anecdote", votes: 3 },
  { content: "This is the third anecdote", votes: 4 },
];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const anecdote = action.payload;
      state.push(anecdote);
    },
    increaseVote(state, action) {
      const index = action.payload;
      state[index].votes++;
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});
export const { increaseVote, setNotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setNotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newNote));
  };
};
export default anecdoteSlice.reducer;
