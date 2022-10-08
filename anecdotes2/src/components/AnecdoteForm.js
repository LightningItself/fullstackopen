import { useDispatch } from "react-redux";
import { createAnecdote, sortAnecdoteList } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.content.value));
    dispatch(sortAnecdoteList());
    e.target.content.value = "";
    dispatch(setNotification("Created new Anecdote!"));
    setTimeout(() => dispatch(setNotification("No notification...")), 3000);
  };
  return (
    <div>
      <h3>Add New Anecdote</h3>
      <form onSubmit={handleSubmit}>
        Anecdote : <input name="content" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
