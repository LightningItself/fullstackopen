import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  console.log("setting token to ", newToken);
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const exports = { getAll, setToken, create };
export default exports;
