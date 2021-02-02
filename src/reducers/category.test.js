import reducer from './category';
import * as actionTypes from '../constants/actionTypes'
const initialState = {
  categories: [],
  categoriesData: {},
  productsData: {},
  isFetchingCategories: false,
  isFetchingCategory: false,
  isFetchingProduct: false,
  currentProductPage: 0
}

describe('Category reducers', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {
      type: '',
      payload: undefined,
    })).toEqual(initialState);
  });

  test('should handle GET_CATEGORIES_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_CATEGORIES_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('should handle GET_CATEGORIES_FAIL', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_CATEGORIES_FAIL,
      })
    ).toEqual({
      ...initialState,
      isLoading: false
    });
  });

  test('should handle GET_CATEGORIES_SUCCESS', () => {
    const data = [
      { id: 1 },
      { id: 2 }
    ]
    expect(
      reducer(initialState, {
        type: actionTypes.GET_CATEGORIES_SUCCESS,
        payload: {
          data
        }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      categories: data
    });
  });


  test('should handle GET_PRODUCTS_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_PRODUCTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isFetchingProduct: true
    });
  });

  test('should handle GET_PRODUCTS_SUCCESS', () => {
    expect(
      reducer({ ...initialState, categoriesData: { 1: { products: [] } } }, {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        payload: {
          categoryId: '1',
          data: [
            { id: 1 }
          ],
          currentPage: 0
        }
      })
    ).toEqual({
      ...initialState,
      isFetchingProduct: false,
      currentProductPage: 0,
      categoriesData: {
        1: {
          products: [{ id: 1 }]
        }
      }
    });
  });

  test('should handle GET_PRODUCT_FAIL', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_PRODUCT_FAIL,
      })
    ).toEqual({
      ...initialState,
      isFetchingProduct: false
    });
  });

  test('should handle GET_CATEGORY_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_CATEGORY_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isFetchingCategory: true
    });
  });

  test('should handle GET_CATEGORY_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_CATEGORY_SUCCESS,
        payload: {
          data: { id: 1 },
          id: 1
        }
      })
    ).toEqual({
      ...initialState,
      isFetchingCategory: false,
      categoriesData: {
        1: {
          id: 1
        }
      }
    });
  });

  test('should handle GET_PRODUCT_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_PRODUCT_SUCCESS,
        payload: {
          id: 1,
          product: {
            id: 1
          }
        }
      })
    ).toEqual({
      ...initialState,
      isFetchingProduct: false,
      productsData: {
        1: {
          id: 1
        }
      }
    });
  });

  test('should handle GET_CATEGORY_FAIL', () => {
    expect(
      reducer(initialState, {
        type: actionTypes.GET_CATEGORY_FAIL,
      })
    ).toEqual({
      ...initialState,
      isFetchingCategory: false
    });
  });
})
