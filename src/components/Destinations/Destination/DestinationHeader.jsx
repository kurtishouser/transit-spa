import React from 'react';
import PropTypes from 'prop-types';

import { Header } from 'semantic-ui-react';
import '../destination.css';

const DestinationHeader = ({ name }) =>
  (<Header as="h2" className="destination-header">
    {name}
  </Header>);

DestinationHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

DestinationHeader.defaultProps = {
  name: '',
};

export default DestinationHeader;
