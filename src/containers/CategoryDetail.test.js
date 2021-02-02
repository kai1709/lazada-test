import React from 'react'
import { CategoryDetail } from './CategoryDetail';
import Loading from '../components/commons/Loading'
import { useParams } from 'react-router-dom'
import { Categories } from './Categories'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { getCategoryDetail, getProducts } from '../actions/category'
import CircularIndeterminate from '../components/commons/Loading'
import userEvent from '@testing-library/user-event'


Enzyme.configure({ adapter: new Adapter() });

const id = '1234'
jest.mock('react-router-dom', () => {
  return {
    useParams: () => ({ id }),
  }
})



jest.mock('../actions/category', () => ({
  getCategoryDetail: jest.fn(),
  getProducts: jest.fn()
}))

describe('CategoryDetail', () => {
  test('should call getCategoryDetail when mounted', () => {
    const props = {
      getCategoryDetail,
      categories: [],
      isLoading: true,
      categoriesData: {}
    }
    render(<CategoryDetail {...props} />)
    expect(getCategoryDetail).toHaveBeenCalled();
    expect(getCategoryDetail).toHaveBeenCalledWith(id);
  })

  test('should render loadign when isFetchingCategory is true', () => {
    const props = {
      getCategoryDetail,
      categories: [],
      isFetchingCategory: true,
      categoriesData: {}
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    const loadingElement = wrapper.find(CircularIndeterminate);
    expect(loadingElement).toHaveLength(1)
  })

  test('should return null when cannot find category detail', () => {
    const props = {
      getCategoryDetail,
      categories: [],
      isFetchingCategory: false,
      categoriesData: {}
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    expect(wrapper.find('.category-detail')).toHaveLength(0)
  })

  test('should call goBack of history when click on Back button', () => {
    const goBack = jest.fn()
    const props = {
      getCategoryDetail,
      categories: [],
      isFetchingCategory: false,
      categoriesData: {
        1234: {
          products: []
        }
      },
      history: { goBack }
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    const button = wrapper.find('.button-back');
    button.simulate('click')
    expect(goBack).toHaveBeenCalled();
  })

  test('should render no products find if there is no products', () => {
    const goBack = jest.fn()
    const props = {
      getCategoryDetail,
      categories: [],
      isFetchingCategory: false,
      categoriesData: {
        1234: {
          products: []
        }
      },
      history: { goBack }
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    const noProductText = wrapper.find('.no-products-text')
    expect(noProductText).toHaveLength(1)
  })

  test('should render number of products correctly ', () => {
    const goBack = jest.fn()
    const props = {
      getCategoryDetail,
      categories: [],
      isFetchingCategory: false,
      categoriesData: {
        1234: {
          products: [
            { id: 1 },
            { id: 2 },
            { id: 3 }
          ]
        }
      },
      history: { goBack }
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    const products = wrapper.find('ProductCard')
    expect(products).toHaveLength(3)
  })


  test('should not render load more button when no products', () => {
    const goBack = jest.fn()
    const props = {
      getCategoryDetail,
      categories: [],
      isFetchingCategory: false,
      categoriesData: {
        1234: {
          products: [
          ]
        }
      },
      history: { goBack }
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    const loadMoreButton = wrapper.find('button-load-more')
    expect(loadMoreButton).toHaveLength(0)
  })

  test('should render load more button when there are products and not loading and not load fully', () => {
    const goBack = jest.fn()
    const props = {
      getCategoryDetail,
      categories: [],
      isFetchingCategory: false,
      isFetchingProduct: false,
      categoriesData: {
        1234: {
          totalProductsCount: 9,
          products: [
            { id: 1 },
            { id: 2 },
            { id: 3 }
          ]
        }
      },
      history: { goBack }
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    const loadMoreButton = wrapper.find('.button-load-more')
    expect(loadMoreButton).toHaveLength(1)
  })

  test('should not render load more button when there are products and not loading but load fully', () => {
    const goBack = jest.fn()
    const props = {
      getCategoryDetail,
      categories: [],
      isFetchingCategory: false,
      isFetchingProduct: false,
      categoriesData: {
        1234: {
          totalProductsCount: 3,
          products: [
            { id: 1 },
            { id: 2 },
            { id: 3 }
          ]
        }
      },
      history: { goBack }
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    const loadMoreButton = wrapper.find('.button-load-more')
    expect(loadMoreButton).toHaveLength(0)
  })

  test('should call getProducts when click load more button', () => {
    const goBack = jest.fn()
    const props = {
      getCategoryDetail,
      getProducts,
      categories: [],
      isFetchingCategory: false,
      isFetchingProduct: false,
      categoriesData: {
        1234: {
          totalProductsCount: 9,
          products: [
            { id: 1 },
            { id: 2 },
            { id: 3 }
          ]
        }
      },
      history: { goBack }
    }
    const wrapper = shallow(<CategoryDetail {...props} />)
    const loadMoreButton = wrapper.find('.button-load-more')
    loadMoreButton.simulate('click')
    expect(getProducts).toHaveBeenCalled()
  })

});
