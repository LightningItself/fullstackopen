import { useState, useEffect } from "react";
import DisplayPersons from "./components/display";
import SearchPersons from "./components/search";
import AddPersons from "./components/addperson";
import ContactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    ContactService.getAllContacts().then((data) => setPersons(data));
  }, []);

  const deleteHandler = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name} ?`
      )
    ) {
      ContactService.deleteContact(id);
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPersons persons={persons} setFilteredPersons={setFilter} />
      <AddPersons persons={persons} setPersons={setPersons} />
      <DisplayPersons
        persons={persons}
        filter={filter}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
