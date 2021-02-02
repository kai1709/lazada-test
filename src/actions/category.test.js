import { getCategories, getCategoryDetail, getProducts, getProductById } from './category'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import config from '../config';
import configureMockStore from 'redux-mock-store'
import {
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORIES_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS
} from '../constants/actionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

jest.mock('../api/category', () => ({
  getCategories: () => {
    return {
      data: {
        data: []
      }
    }
  },
  getCategoryById: (id) => ({
    data: {
      data: {}
    }
  }),
  getProducts: () => ({
    data: {
      data: [],
      total: 0
    }
  }),
  getProductById: (id) => ({
    data: {
      data: {}
    }
  })
}))

describe('Category Actions ', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  describe('getCategories', () => {
    test('should get categories', () => {
      const expectedActions = [
        { type: GET_CATEGORIES_REQUEST },
        { type: GET_CATEGORIES_SUCCESS, payload: { data: [] } }
      ]
      const store = mockStore({ category: {} })

      return store.dispatch(getCategories()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('getCategoryDetail', () => {
    test('should get category detail by id', () => {
      const id = 'id'
      const expectedActions = [
        { type: GET_CATEGORY_REQUEST },
        { type: GET_CATEGORY_SUCCESS, payload: { id, data: { products: [] } } },
        { type: GET_PRODUCTS_REQUEST },
        {
          type: GET_PRODUCTS_SUCCESS, payload: {
            categoryId: id,
            currentPage: 0,
            data: [],
            total: 0
          }
        }
      ]
      const store = mockStore({ category: {} })

      return store.dispatch(getCategoryDetail(id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  }),

    describe('getProducts', () => {
      test('should get products by category id', () => {
        const id = 'id'
        const expectedActions = [
          { type: GET_PRODUCTS_REQUEST },
          {
            type: GET_PRODUCTS_SUCCESS, payload: {
              categoryId: id,
              currentPage: 1,
              data: [],
              total: 0,
            }
          },
        ]
        const store = mockStore({ category: { currentProductPage: 0 } })

        return store.dispatch(getProducts(id)).then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
      })
    })

  describe('getProductById', () => {
    test('should get product by id', () => {
      const id = 'id'
      const expectedActions = [
        { type: GET_PRODUCT_REQUEST },
        {
          type: GET_PRODUCT_SUCCESS, payload: {
            id,
            product: {}
          }
        },
      ]
      const store = mockStore({ category: { currentProductPage: 0 } })

      return store.dispatch(getProductById(id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
});
