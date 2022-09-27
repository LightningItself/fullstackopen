import { useState } from "react";
import ContactService from "../services/contacts";

const AddPersons = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const personExists = (personName) => {
    return persons.find((person) => person.name === personName);
  };

  const generateId = () => {
    return persons.length + 1;
  };

  const AddNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
      id: generateId(),
    };
    const newPersons = persons.concat(newPerson);
    ContactService.addContact(newPerson).then(() => {
      setPersons(newPersons);
      setNewName("");
      setNewNumber("");
    });
  };

  const UpdateExistingPerson = (personName) => {
    if (
      window.confirm(
        `${personName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const existingPerson = persons.find(
        (person) => person.name === personName
      );
      const updatedPerson = { ...existingPerson, number: newNumber };
      ContactService.updateContact(updatedPerson).then(() => {
        const newPersons = persons
          .filter((person) => person.name !== personName)
          .concat(updatedPerson);
        setPersons(newPersons);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (personExists(newName)) {
      UpdateExistingPerson(newName);
    } else {
      AddNewPerson();
    }
  };
  return (
    <div>
      <h2>Numbers</h2>
      <form onSubmit={submitHandler}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPersons;
