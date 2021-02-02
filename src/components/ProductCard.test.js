import React from 'react'
import ProductCard from './ProductCard'
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('ProductCard', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<ProductCard product={{itemPrice: ''}} />);
    expect(wrapper).toMatchSnapshot();
  })
});
