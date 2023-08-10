import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPersonDetailsById } from '../../services/person-service'; // Verifique o caminho correto

function PersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    loadPersonDetails();
  }, []);

  const loadPersonDetails = async () => {
    try {
      const personData = await fetchPersonDetailsById(id);
      setPerson(personData);
    } catch (error) {
      console.error('Error fetching person details:', error);
    }
  };

  if (!person) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="person-details">
      <h2>Detalhes</h2>
      <p style={{color: 'white'}}>Nome: {person.name}</p>
      <p style={{color: 'white'}}>Nascimento: {person.birthDate}</p>
      <p style={{color: 'white'}}>E-mail: {person.email}</p>
      <p style={{color: 'white'}}>Celular: {person.phoneNumber}</p>
      <Link to="/" style={{color: 'white'}}>Clique para voltar</Link>
    </div>
  );
}

export default PersonDetails;
