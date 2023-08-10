import axios from 'axios';

const API_URL = 'https://person-register-backend.onrender.com/person-register';

export const fetchAllPersons = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all persons:', error);
    throw error;
  }
};

export const searchPersonByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/name=${name}`);
    return response.data;
  } catch (error) {
    console.error('Error searching person by name:', error);
    throw error;
  }
};

export const deletePersonById = async (id) => {
  try {
    await axios.delete(`${API_URL}/id=${id}`);
    console.log('Person deleted');
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};

export const fetchPersonDetailsById = async (id) => {
  try {
    const response = await axios.get(
      `https://person-register-backend.onrender.com/person-register/details/${id}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching person details:', error);
    throw error;
  }
};

export const createPerson = async (personData) => {
  try {
    await axios.post('https://person-register-backend.onrender.com/person-register', personData);
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};

