import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.adviceslip.com/advice',
  timeout: 5000,
  timeoutErrorMessage: 'Connection with the API not possible',
});

export default api;
