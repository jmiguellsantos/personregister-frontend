import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './person-form/person-form'; 

function App() {
  const [persons, setPersons] = useState([]);
  const [searchedPerson, setSearchedPerson] = useState(null);

  useEffect(() => {
    fetchAllPersons();
  }, []);

  const fetchAllPersons = async () => {
    try {
      const response = await axios.get('http://localhost:8081/person-register');
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching all persons:', error);
    }
  };

  const searchPerson = async (name) => {
    try {
      const response = await axios.get(`http://localhost:8081/person-register/name=${name}`);
      setSearchedPerson(response.data);
    } catch (error) {
      console.error('Error searching person by name:', error);
    }
  };

  return (
    <div className="App">
      <h1>Person Register</h1>
      
      <PersonForm fetchAllPersons={fetchAllPersons} /> {/* Adicionar o novo componente */}
      
      <h2>All Persons</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
      
      <h2>Search Person by Name</h2>
      <input
        type="text"
        placeholder="Enter name..."
        onChange={(e) => searchPerson(e.target.value)}
      />
      {searchedPerson && (
        <div>
          <p>Nome: {searchedPerson.name}</p>
          <p>Nascimento: {searchedPerson.birthDate}</p>
        </div>
      )}
    </div>
  );
}

export default App;
