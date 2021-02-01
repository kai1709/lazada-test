import {GET_CATEGORIES} from '../constants/actionTypes'

export const getCategories = () => {
  return async (dispatch) => {
    dispatch({
      type: GET_CATEGORIES
    })
  }
}
