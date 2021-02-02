import * as apis from './category'
import axios from 'axios'
import config from '../config'

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn()
}))
describe('API category', () => {
  test('should call getCategories correctly', () => {
    apis.getCategories();
    expect(axios.get).toHaveBeenCalledWith(`${config.API_URL}/category/list`)
  })

  test('should call getCategoryById correctly', () => {
    const id = 'id'
    apis.getCategoryById(id);
    expect(axios.get).toHaveBeenCalledWith(`${config.API_URL}/category/${id}`)
  })

  test('should call getProducts correctly', () => {
    const id = 'id';
    const pageNumber = 1;
    const pageSize = 30;
    apis.getProducts(id, pageNumber, pageSize);
    expect(axios.get).toHaveBeenCalledWith(`${config.API_URL}/product/list?categoryId=${id}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
  })

  test('should call getProductById correctly', () => {
    const id = 'id'
    apis.getProductById(id);
    expect(axios.get).toHaveBeenCalledWith(`${config.API_URL}/product/${id}`)
  })
});
