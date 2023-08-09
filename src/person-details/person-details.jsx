import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function PersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetchPersonDetails();
  }, []);

  const fetchPersonDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/person-register/details/${id}`
      );
      setPerson(response.data);
    } catch (error) {
      console.error('Error fetching person details:', error);
    }
  };

  if (!person) {
    return <div>Carregando.</div>;
  }

  return (
    <div>
      <h2>Detalhes</h2>
      <p>Nome: {person.name}</p>
      <p>Nascimeto: {person.birthDate}</p>
      <p>E-mail: {person.email}</p>
      <p>Celular: {person.phoneNumber}</p>
      <Link to="/">Clique para voltar</Link>
    </div>
  );
}

export default PersonDetails;
