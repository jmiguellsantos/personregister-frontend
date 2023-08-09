import React, { useState } from 'react';
import axios from 'axios';
import './person-form.css'

function PersonForm({ fetchAllPersons }) {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8081/person-register', {
        name: name,
        birthDate: birthdate,
        cpf: cpf,
        email: email,
        phoneNumber: phoneNumber
      });

      console.log('Person saved');
      fetchAllPersons();
      setName('');
      setBirthdate('');
      setCPF('');
      setEmail('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error saving person:', error);
    }
  };

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Birthdate:</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>CPF:</label>
        <input type="text" value={cpf} onChange={(e) => setCPF(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>E-mail:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Celular:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
      </div>
      <button type="submit" className="submit-button">Save</button>
    </form>
  );
}

export default PersonForm;
