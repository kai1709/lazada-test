import React from 'react'
import CategoryCard from './CategoryCard'
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('CategoryCard', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<CategoryCard category={{}} />);
    expect(wrapper).toMatchSnapshot();
  })
});
