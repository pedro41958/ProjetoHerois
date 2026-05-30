import axios from "axios";

async function listarHerois() {
  const { data } = await axios.get("http://localhost:3000/listarHerois");
  return data;
}

export default listarHerois;
