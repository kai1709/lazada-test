import React from 'react'
import { ProductDetail } from './ProductDetail';
import Loading from '../components/commons/Loading'
import { useParams } from 'react-router-dom'
import { Categories } from './Categories'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { getProductById, getProducts } from '../actions/category'
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
  getProductById: jest.fn(),
  getProducts: jest.fn()
}))

describe('ProductDetail', () => {
  test('should call getProductById when mounted', () => {
    const props = {
      getProductById,
      categories: [],
      productsData: {}
    }
    render(<ProductDetail {...props} />)
    expect(getProductById).toHaveBeenCalled();
    expect(getProductById).toHaveBeenCalledWith(id);
  })

  test('should render loadign when isFetchingCategory is true', () => {
    const props = {
      getProductById,
      isFetchingProduct: true,
      productsData: {}
    }
    const wrapper = shallow(<ProductDetail {...props} />)
    const loadingElement = wrapper.find(CircularIndeterminate);
    expect(loadingElement).toHaveLength(1)
  })

  test('should return null when cannot find category detail', () => {
    const props = {
      getProductById,
      isFetchingProduct: false,
      productsData: {}
    }
    const wrapper = shallow(<ProductDetail {...props} />)
    expect(wrapper.find('.product-detail')).toHaveLength(0)
  })

  test('should call goBack of history when click on Back button', () => {
    const goBack = jest.fn()
    const props = {
      getProductById,
      isFetchingProduct: false,
      productsData: {
        1234: {
          itemPrice: ''
        }
      },
      history: { goBack }
    }
    const wrapper = shallow(<ProductDetail {...props} />)
    const button = wrapper.find('.button-back');
    button.simulate('click')
    expect(goBack).toHaveBeenCalled();
  })

  // test('should render no products find if there is no products', () => {
  //   const goBack = jest.fn()
  //   const props = {
  //     getCategoryDetail,
  //     categories: [],
  //     isFetchingCategory: false,
  //     categoriesData: {
  //       1234: {
  //         products: []
  //       }
  //     },
  //     history: { goBack }
  //   }
  //   const wrapper = shallow(<ProductDetail {...props} />)
  //   const noProductText = wrapper.find('.no-products-text')
  //   expect(noProductText).toHaveLength(1)
  // })

  // test('should render number of products correctly ', () => {
  //   const goBack = jest.fn()
  //   const props = {
  //     getCategoryDetail,
  //     categories: [],
  //     isFetchingCategory: false,
  //     categoriesData: {
  //       1234: {
  //         products: [
  //           { id: 1 },
  //           { id: 2 },
  //           { id: 3 }
  //         ]
  //       }
  //     },
  //     history: { goBack }
  //   }
  //   const wrapper = shallow(<ProductDetail {...props} />)
  //   const products = wrapper.find('ProductCard')
  //   expect(products).toHaveLength(3)
  // })


  // test('should not render load more button when no products', () => {
  //   const goBack = jest.fn()
  //   const props = {
  //     getCategoryDetail,
  //     categories: [],
  //     isFetchingCategory: false,
  //     categoriesData: {
  //       1234: {
  //         products: [
  //         ]
  //       }
  //     },
  //     history: { goBack }
  //   }
  //   const wrapper = shallow(<ProductDetail {...props} />)
  //   const loadMoreButton = wrapper.find('button-load-more')
  //   expect(loadMoreButton).toHaveLength(0)
  // })

  // test('should render load more button when there are products and not loading and not load fully', () => {
  //   const goBack = jest.fn()
  //   const props = {
  //     getCategoryDetail,
  //     categories: [],
  //     isFetchingCategory: false,
  //     isFetchingProduct: false,
  //     categoriesData: {
  //       1234: {
  //         totalProductsCount: 9,
  //         products: [
  //           { id: 1 },
  //           { id: 2 },
  //           { id: 3 }
  //         ]
  //       }
  //     },
  //     history: { goBack }
  //   }
  //   const wrapper = shallow(<ProductDetail {...props} />)
  //   const loadMoreButton = wrapper.find('.button-load-more')
  //   expect(loadMoreButton).toHaveLength(1)
  // })

  // test('should not render load more button when there are products and not loading but load fully', () => {
  //   const goBack = jest.fn()
  //   const props = {
  //     getCategoryDetail,
  //     categories: [],
  //     isFetchingCategory: false,
  //     isFetchingProduct: false,
  //     categoriesData: {
  //       1234: {
  //         totalProductsCount: 3,
  //         products: [
  //           { id: 1 },
  //           { id: 2 },
  //           { id: 3 }
  //         ]
  //       }
  //     },
  //     history: { goBack }
  //   }
  //   const wrapper = shallow(<ProductDetail {...props} />)
  //   const loadMoreButton = wrapper.find('.button-load-more')
  //   expect(loadMoreButton).toHaveLength(0)
  // })

  // test('should call getProducts when click load more button', () => {
  //   const goBack = jest.fn()
  //   const props = {
  //     getCategoryDetail,
  //     getProducts,
  //     categories: [],
  //     isFetchingCategory: false,
  //     isFetchingProduct: false,
  //     categoriesData: {
  //       1234: {
  //         totalProductsCount: 9,
  //         products: [
  //           { id: 1 },
  //           { id: 2 },
  //           { id: 3 }
  //         ]
  //       }
  //     },
  //     history: { goBack }
  //   }
  //   const wrapper = shallow(<ProductDetail {...props} />)
  //   const loadMoreButton = wrapper.find('.button-load-more')
  //   loadMoreButton.simulate('click')
  //   expect(getProducts).toHaveBeenCalled()
  // })

});
