import React from 'react';
import PropTypes from 'prop-types';

import { Icon, List, Step } from 'semantic-ui-react';

function formatAgency(step) {
  let output = '';
  if (step.mode.includes('WALKING')) {
    output = 'Walk';
  }
  if (step.agency) {
    output = step.agency.replace(/Bay Area Rapid Transit/, 'BART');
  }
  return output;
}

function getInstructions(step) {
  let instr = '';
  if (!step) {
    return instr;
  }
  if (step.shortName) {
    if (step.instruction.startsWith('Bus ')) {
      instr = step.instruction.replace(/^Bus /, `Bus ${step.shortName} `);
    } else {
      instr = `${step.shortName} ${step.instruction}`;
    }
  } else {
    instr = step.instruction;
  }
  instr = instr.replace(/^Walk /, '');
  instr = instr.replace(/San Francisco International Airport/, 'SF Intl. Airport');
  return instr;
}

const JourneyVisualization = ({ active, steps }) =>
  (<List.Item>
    <Step.Group>
      {steps.map((step, index) => {
        let name;

        if (step.mode === 'WALKING' && index !== 0) return null;

        if (step.mode.includes('WALKING')) {
          name = 'blind';
        }

        if (step.mode === 'TRANSIT') {
          name = step.instruction.includes('rail') ? 'subway' : 'bus';
        }

        const uniqueKey = step.shortName + step.instruction;
        const agency = formatAgency(step);
        const instructions = getInstructions(step);

        return (
          <Step disabled={active} key={uniqueKey}>
            <Icon name={name} size="big" />
            <Step.Content title={agency} description={instructions} />
          </Step>
        );
      })}
    </Step.Group>
  </List.Item>);

JourneyVisualization.propTypes = {
  active: PropTypes.bool.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

JourneyVisualization.defaultProps = {
  active: null,
  steps: [{}],
};

export default JourneyVisualization;
