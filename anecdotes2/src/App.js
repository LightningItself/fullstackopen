import AnecdotesList from "./components/AnecdotesList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Notification />
      <div>
        <Link to="/">anecdotes</Link>
        <Link to="/create">create new</Link>
        <Link to="/about">about</Link>
      </div>

      <h1>Anecdotes</h1>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <FilterForm />
              <AnecdotesList />
            </div>
          }
        />
        <Route path="/create" element={<AnecdoteForm />} />
        <Route path="/about" element={<div>about page</div>} />
      </Routes>
      <div>
        <i>Anecdotes app, Indrayudh Ghosh, IIT-BBS</i>
      </div>
    </Router>
  );
};

export default App;
