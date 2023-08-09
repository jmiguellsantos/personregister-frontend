import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import PersonForm from './person-form/person-form';
import PersonDetails from './person-details/person-details';
import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [searchedPerson, setSearchedPerson] = useState(null);

  useEffect(() => {
    fetchAllPersons();
  }, []);

  const fetchAllPersons = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8081/person-register'
      );
      setPersons(response.data);
    } catch (error) {
      console.error('Error fetching all persons:', error);
    }
  };

  const searchPerson = async (name) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/person-register/name=${name}`
      );
      setSearchedPerson(response.data);
    } catch (error) {
      console.error('Error searching person by name:', error);
    }
  };

  const deletePerson = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/person-register/id=${id}`);
      console.log('Person deleted');
      fetchAllPersons();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Registro de Pessoas</h1>

        <PersonForm fetchAllPersons={fetchAllPersons} />

        <h2>Pesquisa pelo nome</h2>
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

        <h2>Registrados</h2>
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              <Link to={`/person/${person.id}`}>{person.name}</Link>
              <button onClick={() => deletePerson(person.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route path="/person/:id" element={<PersonDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
