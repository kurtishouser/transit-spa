import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { DestinationTable } from './DestinationTable';

describe('DestinationTable', () => {
  it('should render an empty table', () => {
    const component = shallow(<DestinationTable />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
