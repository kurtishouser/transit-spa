import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon, List } from 'semantic-ui-react';
import Timer from './Timer';

class TimeToLeave extends Component {
  constructor(props) {
    super(props);

    this.timerExpired = this.timerExpired.bind(this);
  }

  timerExpired() {
    this.props.callRefreshJourneys();
  }

  render() {
    return (
      <List.Item>
        <Icon name="hourglass half" size="large" />
        <List.Content>
          <List.Header>leave in</List.Header>
          <Timer seconds={this.props.timeToLeaveInSeconds} onComplete={this.timerExpired} />
        </List.Content>
      </List.Item>
    );
  }
}

TimeToLeave.propTypes = {
  timeToLeaveInSeconds: PropTypes.number.isRequired,
  callRefreshJourneys: PropTypes.func.isRequired,
};

TimeToLeave.defaultProps = {
  timeToLeaveInSeconds: 5,
  callRefreshJourneys: () => {},
};

export default TimeToLeave;
