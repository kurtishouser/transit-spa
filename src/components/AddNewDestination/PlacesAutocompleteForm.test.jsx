import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PlacesAutocompleteForm } from './PlacesAutocompleteForm';

describe('PlacesAutocompleteForm', () => {
  it('should render an empty form', () => {
    const component = shallow(<PlacesAutocompleteForm />);
    expect(toJson(component)).toMatchSnapshot();
  });
});

/*
There is a submit button in the form but it's not possible to test it. The
reason is that when mounting the component a Google library is loaded and it
needs to have a window context.
*/
