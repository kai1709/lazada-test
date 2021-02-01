import axios from 'axios'
import config from '../config';

export const getCategories = () => {
  return axios.get(`${config.API_URL}/category/list`);
}

export const getCategoryById = (id) => {
  return axios.get(`${config.API_URL}/category/${id}`);
}

export const getProducts = (categoryId = '', pageNumber = 0, pageSize = 8) => {
  return axios.get(`${config.API_URL}/product/list?categoryId=${categoryId}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

export const getProductById = (id) => {
  return axios.get(`${config.API_URL}/product/${id}`)
}
