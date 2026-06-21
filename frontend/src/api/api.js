import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Interceptor de resposta — captura erros do backend
api.interceptors.response.use(
  (response) => response, // deixa respostas bem-sucedidas passarem
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token"); // limpa o token inválido
      window.location.href = "/loginUsuario"; // redireciona para login
    }
    return Promise.reject(error);
  },
);

export default api;
