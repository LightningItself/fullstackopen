import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const CreateAnecdote = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.newAnecdote.value;
    e.target.newAnecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(notify("Added New Anecdote"));
    setTimeout(() => dispatch(notify("")), 3000);
  };
  return (
    <form onSubmit={addAnecdote}>
      <h2>Add new Anecdote</h2>
      <input name="newAnecdote" />
      <button type="submit">submit</button>
    </form>
  );
};
export default CreateAnecdote;
