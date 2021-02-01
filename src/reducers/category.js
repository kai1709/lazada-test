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

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.payload.data
      }
    case actionTypes.GET_CATEGORIES_FAIL:
      return {
        ...state,
        isLoading: false,
      }

    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        ...state,
        isFetchingProduct: true
      }
  case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isFetchingProduct: false,
        categoriesData: {
          [action.payload.categoryId]: {
            ...state.categoriesData[action.payload.categoryId],
            products: [...state.categoriesData[action.payload.categoryId].products, ...action.payload.data],
            totalProductsCount: action.payload.total
          }
        },
        currentProductPage: action.payload.currentPage
      }
    case actionTypes.GET_PRODUCT_FAIL:
      return {
        ...state,
        isFetchingProduct: false,
      }

    case actionTypes.GET_CATEGORY_REQUEST:
      return {
        ...state,
        isFetchingCategory: true
      }
    case actionTypes.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetchingCategory: false,
        categoriesData: {
          ...state.categoriesData,
          [action.payload.id]: action.payload.data
        }
      }

    case actionTypes.GET_PRODUCT_REQUEST:
      return {
        ...state,
        isFetchingProduct: true
      }
    case actionTypes.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetchingProduct: false,
        productsData: {
          ...state.productsData,
          [action.payload.id]: action.payload.product
        }
      }
    case actionTypes.GET_CATEGORY_FAIL:
      return {
        ...state,
        isFetchingCategory: false,
      }
    default:
      return state;
  }
};
