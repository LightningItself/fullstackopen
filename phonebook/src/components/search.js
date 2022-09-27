import { useState } from "react";

const SearchPersons = ({ persons, setFilteredPersons }) => {
  const [newFilter, setNewFilter] = useState("");

  const handleSubmission = (event) => {
    event.preventDefault();
    setFilteredPersons(newFilter);
  };

  return (
    <form onSubmit={handleSubmission}>
      <div>
        filter shown with{" "}
        <input
          value={newFilter}
          onChange={(event) => setNewFilter(event.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchPersons;
