import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDestination } from '../../actions';
import './button.css';

import Api from '../../utils/Api';

export class PlacesAutocompleteForm extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '600 Guerrero St, San Francisco, CA 94110' };
    this.onChange = address => this.setState({ address });
  }

  reportError = (message) => {
    /* eslint-disable no-alert */
    alert(message);
    this.setState({ address: '' });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    Api.fetchJourneys(this.props.origin, this.state.address)
      .then((result) => {
        if (result.length > 1) {
          this.props.addDestination(this.state.address);
          this.props.onClick();
          return;
        }
        this.reportError('no transit options available');
      })
      .catch(e => e);
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      placeholder: 'Choose a new destination',
    };

    return (
      <form className="ui semantic" onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} />
        <button className="ui green button" id="submit-destination" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

PlacesAutocompleteForm.propTypes = {
  onClick: PropTypes.func.isRequired,
  addDestination: PropTypes.func.isRequired,
  origin: PropTypes.string.isRequired,
};

PlacesAutocompleteForm.defaultProps = {
  onClick: () => {},
  addDestination: () => {},
  origin: '',
};

export const mapStateToProps = (state) => {
  const origin = state.configuration.currentLocation.address;

  return {
    origin,
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDestination,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlacesAutocompleteForm);
