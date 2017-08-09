import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCurrentLocation } from '../../actions';

export class CurrentLocation extends Component {
  componentDidMount() {
    this.props.updateCurrentLocation();
  }

  render() {
    const { geolocating, currentLocation } = this.props;

    return (
      <Segment>
        <h1>
          { geolocating
            ? 'Determining your current location...'
            : `Current Location: ${currentLocation.address}` }
        </h1>
      </Segment>
    );
  }
}

CurrentLocation.propTypes = {
  geolocating: PropTypes.bool.isRequired,
  currentLocation: PropTypes.shape({
    address: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  updateCurrentLocation: PropTypes.func.isRequired,
};

CurrentLocation.defaultProps = {
  geolocating: true,
  currentLocation: {
    address: 'Tehama St, San Francisco, CA 94105',
    lat: 37.7873889,
    lng: -122.3964106 },
  updateCurrentLocation: () => {},
};

export const mapStateToProps = (state) => {
  const geolocating = state.configuration.geolocating;
  const currentLocation = state.configuration.currentLocation;

  return {
    geolocating,
    currentLocation,
  };
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCurrentLocation,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLocation);
