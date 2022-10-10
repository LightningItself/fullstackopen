import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote, sortAnecdoteList } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdotesList = () => {
  const dispatch = useDispatch();
  const addVote = (id) => {
    dispatch(voteAnecdote(id));
    dispatch(sortAnecdoteList());
    dispatch(setNotification(`Voted!`));
    dispatch(setNotification(`No notification...`));
  };
  const filteredAnecdotes = (anecdotes) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => filteredAnecdotes(state.anecdotes));
  return (
    <div>
      <h3>Anecdotes List:</h3>
      {anecdotes.map((anecdote, index) => (
        <AnecdoteView
          key={index}
          anecdote={anecdote}
          voteHandler={() => addVote(anecdote.id)}
        />
      ))}
    </div>
  );
};

export const AnecdoteView = ({ anecdote, voteHandler }) => {
  return (
    <div>
      <p>{anecdote.content}</p>
      <strong>has {anecdote.votes} votes</strong>{" "}
      <button onClick={voteHandler}>vote</button>
    </div>
  );
};

export default AnecdotesList;
