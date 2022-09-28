import { useState, useEffect } from "react";
import DisplayPersons from "./components/display";
import SearchPersons from "./components/search";
import AddPersons from "./components/addperson";
import Notification from "./components/notification";
import ContactService from "./services/contacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notifMessage, setNotifMessage] = useState("");

  const setNotif = (message) => {
    setNotifMessage(message);
    setTimeout(() => {
      setNotifMessage("");
    }, 3000);
  };

  useEffect(() => {
    ContactService.getAllContacts().then((data) => setPersons(data));
  }, []);

  const deleteHandler = (id) => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      ContactService.deleteContact(id)
        .then(() => setNotif(`Deleted ${person.name}`))
        .catch((error) => {
          setNotif(`${person.name} was already removed from Phonebook`);
        });
      const newPersons = persons.filter((person) => person.id !== id);
      setPersons(newPersons);
    }
  };

  return (
    <div>
      <Notification message={notifMessage} />
      <h2>Phonebook</h2>
      <SearchPersons persons={persons} setFilteredPersons={setFilter} />
      <AddPersons
        persons={persons}
        setPersons={setPersons}
        setNotif={setNotif}
      />
      <DisplayPersons
        persons={persons}
        filter={filter}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
