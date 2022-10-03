import axios from "axios";
const baseUrl = "http://localhost:3001/api/login";

const login = async ({ username, password }) => {
  return await axios.post(baseUrl, { username: username, password: password });
};

const exports = { login };
export default exports;
