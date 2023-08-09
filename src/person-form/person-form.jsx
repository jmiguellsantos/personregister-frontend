import React, { useState } from 'react';
import axios from 'axios';

function PersonForm({ fetchAllPersons }) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [cpf, setCPF] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/person-register', {
        name: name,
        birthDate: birthdate,
        cpf: cpf
      });

      console.log('Person saved');
      fetchAllPersons();
      setName('');
      setBirthdate('');
    } catch (error) {
      console.error('Error saving person:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Birthdate:</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
      </div>
      <div>
        <label>CPF:</label>
        <input type="text" value={cpf} onChange={(e) => setCPF(e.target.value)} required />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default PersonForm;
