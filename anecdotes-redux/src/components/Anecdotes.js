import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const addVote = (index) => {
    dispatch(increaseVote(index));
  };

  return (
    <div>
      {anecdotes.map((anecdote, index) => (
        <div key={index}>
          <Anecdote content={anecdote.content} vote={anecdote.votes} />
          <button
            onClick={() => {
              addVote(index);
            }}
          >
            vote
          </button>
        </div>
      ))}
    </div>
  );
};

const Anecdote = ({ content, vote }) => {
  return (
    <div>
      <p>{content}</p>
      <p>
        <strong> {`has ${vote} votes`}</strong>
      </p>
    </div>
  );
};

export default Anecdotes;
