import Anecdotes from "./components/Anecdotes";
import CreateAnecdote from "./components/CreateAnecdote";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAnecdotes, setNotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);
  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <CreateAnecdote />
      <Anecdotes />
    </div>
  );
};

export default App;
