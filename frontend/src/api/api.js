import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export default api;

/*
async function listarHerois() {
  const { data } = await axios.get("http://localhost:3000/listarHerois");
  return data;
}

export default listarHerois;
*/
