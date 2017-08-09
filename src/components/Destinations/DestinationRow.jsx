import React from 'react';
import PropTypes from 'prop-types';

import { Container, Segment } from 'semantic-ui-react';

import JourneyTable from '../Journeys/JourneyTable';
import DestinationHeader from './Destination/DestinationHeader';
import './destination.css';

export const DestinationRow = ({ id, name }) =>
  (<Container>
    <Segment compact>
      <DestinationHeader name={name} />
    </Segment>
    <Segment compact textAlign="center">
      <JourneyTable id={id} />
    </Segment>
  </Container>);

DestinationRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

DestinationRow.defaultProps = {
  id: 1,
  name: '',
};

export default DestinationRow;
