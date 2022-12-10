import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://board-nine.vercel.app/api' : 'http://localhost:3000/api',
});
