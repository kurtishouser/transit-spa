import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DestinationRow } from './DestinationRow';

describe('DestinationRow', () => {
  it('should render an empty form', () => {
    const component = shallow(<DestinationRow />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
