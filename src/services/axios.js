import axios from 'axios';

const backendAPI = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const baseURL = `${backendAPI}/api`;

export const baseUsuariosURL = `${baseURL}/usuarios`;

export const baseClientesURL = `${baseURL}/clientes`;

export const baseFuncionariosURL = `${baseURL}/funcionarios`;

export const baseEstabelecimentosURL = `${baseURL}/estabelecimentos`;

export const baseHorariosURL = `${baseURL}/horarios`;

const axiosInstance = axios.create();

export default axiosInstance;
