const DisplayPersons = ({ persons, filter, deleteHandler }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  return filteredPersons.map((person) => (
    <Person key={person.id} person={person} deleteHandler={deleteHandler} />
  ));
};

const Person = ({ person, deleteHandler }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deleteHandler(person.id)}>delete</button>
    </div>
  );
};

export default DisplayPersons;
