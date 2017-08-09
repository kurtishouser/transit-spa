import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimeToLeave from './TimeToLeave';

describe('TimeToLeave', () => {
  it('renders list item', () => {
    const component = shallow(<TimeToLeave timeToLeaveInSeconds={120} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('has timeToLeaveInSeconds prop as a number of seconds', () => {
    const component = mount(<TimeToLeave timeToLeaveInSeconds={120} />);
    expect(component.props().timeToLeaveInSeconds).toEqual(120);
  });

  it('has timerExpired method', () => {
    const component = shallow(<TimeToLeave timeToLeaveInSeconds={120} />);
    expect(component.instance().timerExpired());
  });
});
