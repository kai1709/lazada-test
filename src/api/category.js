import axios from 'axios'
import {API_URL} from '../config';

export const getCategories = () => {
  return axios.get(`${API_URL}/category/list`);
}
