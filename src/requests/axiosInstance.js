import axios from 'axios';
import {SERVER} from '../utils/constant';

export const axiosInstance = axios.create({
  baseURL: SERVER,
});
