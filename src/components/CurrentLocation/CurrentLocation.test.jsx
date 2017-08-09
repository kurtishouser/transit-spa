import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import {
  CurrentLocation,
  mapDispatchToProps,
  mapStateToProps } from './CurrentLocation';

describe('CurrentLocation', () => {
  it('should render Determining your current location...', () => {
    const component = shallow(<CurrentLocation />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('should render Current Location: YOUR_ADDRESS when geolocating prop is false', () => {
    const currentLocation = { address: '1234 Main St' };
    const component = shallow(<CurrentLocation geolocating={false} currentLocation={currentLocation} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('calls updateCurrentLocation on load', () => {
    const updateCurrentLocation = jest.fn();
    mount(<CurrentLocation updateCurrentLocation={updateCurrentLocation} />);

    expect(updateCurrentLocation).toHaveBeenCalled();
  });

  it('mapStateToProps should return geolocating flag and current location', () => {
    const state = { configuration: {
      geolocating: true,
      currentLocation: {
        address: '44 Tehama St, San Francisco, CA 94105',
        lat: 37.7873889,
        lng: -122.3964106 },
    } };

    const expected = { geolocating: true,
      currentLocation: {
        address: '44 Tehama St, San Francisco, CA 94105',
        lat: 37.7873889,
        lng: -122.3964106 },
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('mapDispatchToProps should have property updateCurrentLocation', () => {
    const dispatch = jest.fn();

    expect(mapDispatchToProps(dispatch)).toHaveProperty('updateCurrentLocation');
  });
});
