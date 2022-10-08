import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";

const App = () => {
  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <AnecdoteForm />
      <FilterForm />
      <AnecdotesList />
    </div>
  );
};

export default App;
