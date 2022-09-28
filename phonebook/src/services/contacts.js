import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAllContacts = () => {
  return axios.get(baseUrl).then((response) => {
    console.log(response.data);
    return response.data;
  });
};
const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const addContact = (newContact) => {
  return axios.post(baseUrl, newContact);
};

const updateContact = (contact) => {
  return axios.put(`${baseUrl}/${contact.id}`, contact);
};

const exports = {
  getAllContacts,
  deleteContact,
  addContact,
  updateContact,
};
export default exports;
