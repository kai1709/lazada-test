import React from 'react'
import Loading from '../components/commons/Loading'
import { Categories } from './Categories'
import { getCategories } from '../actions/category'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../actions/category', () => ({
  getCategories: jest.fn()
}))
describe('Categories', () => {
  test('should call getCategories when mounted', () => {
    const props = {
      getCategories,
      categories: [],
      isLoading: true
    }
    render(<Categories {...props} />)
    expect(getCategories).toHaveBeenCalled();
  })

  test('should render Loading when isLoading is true', () => {
    const props = {
      getCategories,
      categories: [],
      isLoading: true
    }
    const renderResult = render(<Categories {...props} />)
    const loadingElem = renderResult.getByTestId('loading')
    expect(loadingElem).not.toBe(null);
  })

  test('should render number of CategoryCard correctly', () => {
    const props = {
      getCategories,
      categories: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      isLoading: false
    }
    const wrapper = shallow(<Categories {...props} />)
    const categoryCards = wrapper.find('CategoryCard')
    expect(categoryCards).toHaveLength(4)
  })
})
