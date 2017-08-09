import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Timer from './Timer';

describe('Timer', () => {
  const callback = () => {};

  it('renders minutes and seconds when passed seconds as props', () => {
    const component = shallow(<Timer seconds={120} onComplete={callback} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders double-digit minutes and seconds when passed seconds as props', () => {
    const component = shallow(<Timer seconds={600} onComplete={callback} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('has decrement method', () => {
    const component = shallow(<Timer seconds={120} onComplete={callback} />);
    expect(component.instance().decrement());
  });

  it('accepts a callback function as props', () => {
    const component = mount(<Timer seconds={120} onComplete={callback} />);
    expect(component.props().onComplete).toEqual(callback);
  });

  it('initializes with currentCount equal to the seconds passed in as props', () => {
    const component = mount(<Timer seconds={120} onComplete={callback} />);
    expect(component.state('currentCount')).toEqual(120);
  });

  it('calls decrement and decreases the currentCount', () => {
    const component = shallow(<Timer seconds={120} onComplete={callback} />);
    expect(component.instance().state.currentCount).toEqual(120);
    component.instance().decrement();
    expect(component.instance().state.currentCount).toEqual(119);
  });

  it('has componentWillUnmount method', () => {
    const component = shallow(<Timer seconds={120} onComplete={callback} />);
    expect(component.instance().componentWillUnmount());
  });

  it('has componentDidMount method', () => {
    const component = shallow(<Timer seconds={120} onComplete={callback} />);
    expect(component.instance().componentDidMount());
  });

  it('has componentWillReceiveProps method', () => {
    const component = shallow(<Timer seconds={120} onComplete={callback} />);
    expect(component.instance().state.currentCount).toEqual(120);
    component.instance().componentWillReceiveProps({ seconds: 300 });
    expect(component.instance().state.currentCount).toEqual(300);
  });

  it('calls onComplete when decrementing to 0', () => {
    const onComplete = jest.fn();
    const component = mount(<Timer seconds={1} loading onComplete={onComplete} />);
    component.instance().decrement();
    expect(onComplete).toHaveBeenCalled();
  });
});
