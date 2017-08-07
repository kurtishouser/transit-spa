import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCurrentLocation } from '../../actions';

export class CurrentLocation extends Component {
  constructor(props) {
    super(props);

    this.state = { geolocating: true };
  }
  componentDidMount() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const location = {
          address: `${lat}, ${lng}`, // until reverse geocoding is implemented
          lat,
          lng,
        };
        this.setState({ geolocating: false });
        this.props.updateCurrentLocation(location);
      });
    }
  }

  render() {
    const { geolocating } = this.state;
    const { currentLocation } = this.props;

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
  currentLocation: PropTypes.shape({
    address: PropTypes.string,
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  updateCurrentLocation: PropTypes.func.isRequired,
};

CurrentLocation.defaultProps = {
  currentLocation: {
    address: '44 Tehama St, San Francisco, CA 94105',
    lat: 37.7873889,
    lng: -122.3964106 },
  updateCurrentLocation: () => {},
};

export const mapStateToProps = (state) => {
  const currentLocation = state.configuration.currentLocation;

  return {
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
