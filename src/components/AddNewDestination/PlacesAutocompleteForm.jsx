import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete from 'react-places-autocomplete';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDestination } from '../../actions';
import './button.css';

class PlacesAutocompleteForm extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '600 Guerrero St, San Francisco, CA 94110' };
    this.onChange = address => this.setState({ address });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.onClick();
    this.props.addDestination(this.state.address);
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      autoFocus: true,
      placeholder: 'ZOOM!',
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
};

PlacesAutocompleteForm.defaultProps = {
  onClick: () => {},
  addDestination: () => {},
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addDestination,
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(PlacesAutocompleteForm);
