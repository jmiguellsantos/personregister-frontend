import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import PersonForm from './components/person-form/person-form';
import PersonDetails from './components/person-details/person-details';
import {
  fetchAllPersons,
  searchPersonByName,
  deletePersonById,
} from './services/person-service'; // Importando as funções do serviço

function SearchBar({ onSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Digite um nome..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  );
}

function PersonList({ persons, onDeletePerson }) {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          <Link to={`/person/${person.id}`} style={{ color: 'white' }}>
            {person.name}
          </Link>
          <button
            onClick={() => onDeletePerson(person.id)}
            style={{ color: 'white' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [persons, setPersons] = useState([]);
  const [searchedPerson, setSearchedPerson] = useState(null);

  useEffect(() => {
    loadAllPersons();
  }, []);

  const loadAllPersons = async () => {
    try {
      const allPersons = await fetchAllPersons();
      setPersons(allPersons);
    } catch (error) {
      console.error('Error loading all persons:', error);
    }
  };

  const searchPerson = async (name) => {
    try {
      const foundPerson = await searchPersonByName(name);
      setSearchedPerson(foundPerson);
    } catch (error) {
      console.error('Error searching person by name:', error);
    }
  };

  const handleDeletePerson = async (id) => {
    try {
      await deletePersonById(id);
      loadAllPersons();
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <h1>Registro de Pessoas</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PersonForm fetchAllPersons={loadAllPersons} />
                <h2>Pesquisa pelo nome</h2>
                <SearchBar onSearch={searchPerson} />
                {searchedPerson && (
                  <div>
                    <p style={{color: 'white'}}>Nome: {searchedPerson.name}</p>
                    <p style={{color: 'white'}}>Nascimento: {searchedPerson.birthDate}</p>
                  </div>
                )}
                <h2>Registrados</h2>
                <PersonList
                  persons={persons}
                  onDeletePerson={handleDeletePerson}
                />
              </>
            }
          />
          <Route path="/person/:id" element={<PersonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
