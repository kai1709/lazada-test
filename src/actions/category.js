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
import * as CategoryApi from '../api/category'

export const getCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_CATEGORIES_REQUEST
    })
    const categories = await CategoryApi.getCategories();
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: {
        data: categories.data.data
      }
    })
  }
}

export const getCategoryDetail = (id) => {
  return async (dispatch) => {
    dispatch({
      type: GET_CATEGORY_REQUEST
    })
    const category = await CategoryApi.getCategoryById(id)

    const data = category.data.data
    if (!data) return dispatch({
      type: GET_CATEGORY_FAIL
    })

    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: {
        id,
        data: {...data, products: []}
      }
    })
    dispatch({
      type: GET_PRODUCTS_REQUEST,
    })

    const products = await CategoryApi.getProducts(id, 0)
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: {
        currentPage: 0,
        data: products.data.data,
        categoryId: id,
        total: products.data.total
      }
    })
  }
}

export const getProducts = (categoryId) => {
  return async (dispatch, getState) => {
    const currentPage = getState().category.currentProductPage;

    dispatch({
      type: GET_PRODUCTS_REQUEST,
    })

    const products = await CategoryApi.getProducts(categoryId, currentPage + 1)
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: {
        currentPage: currentPage + 1,
        data: products.data.data,
        categoryId,
        total: products.data.total
      }
    })
  }
}

export const getProductById = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_PRODUCT_REQUEST,
    })

    const product = await CategoryApi.getProductById(id)

    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: {
        product: product.data.data,
        id
      }
    })
  }
}
