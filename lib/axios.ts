import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://board-nine.vercel.app/api',
});
