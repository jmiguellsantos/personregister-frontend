import React, { useState } from 'react';
import { createPerson } from '../../services/person-service';
import './person-form.css';

function PersonForm({ fetchAllPersons }) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPerson({
        name: name,
        birthDate: birthdate,
        cpf: cpf,
        email: email,
        phoneNumber: phoneNumber,
      });

      console.log('Person saved');
      fetchAllPersons();
      clearForm();
    } catch (error) {
      console.error('Error saving person:', error);
    }
  };

  const clearForm = () => {
    setName('');
    setBirthdate('');
    setCPF('');
    setEmail('');
    setPhoneNumber('');
  };

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Nascimento:</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>CPF:</label>
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCPF(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>E-mail:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Celular:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-button">
        Save
      </button>
    </form>
  );
}

export default PersonForm;
