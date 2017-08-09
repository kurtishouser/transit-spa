import * as TYPES from '../constants/constants';

export function updateCurrentLocation() {
  return async (dispatch, getState, { Api }) => {
    dispatch({
      type: TYPES.GEOLOCATING,
    });

    const location = await Api.getCurrentLocation();

    return dispatch({
      type: TYPES.UPDATE_CURRENT_LOCATION,
      currentLocation: location,
    });
  };
}

export function addDestination(dest) {
  return {
    type: TYPES.ADD_DESTINATION,
    destination: dest,
  };
}

export function addJourneys(destinationId, journeys) {
  return {
    type: TYPES.ADD_JOURNEYS,
    destinationId,
    journeys,
  };
}

export function removeJourneys(destinationId) {
  return {
    type: TYPES.REMOVE_JOURNEYS,
    destinationId,
  };
}

export function removeDestination(destinationId) {
  return {
    type: TYPES.REMOVE_DESTINATION,
    destinationId,
  };
}

export function refreshJourneys(destinationId, origin, destination) {
  return async (dispatch, getState, { Api }) => {
    const json = await Api.fetchJourneys(origin, destination);

    const journeys = json.map((rawJourneyObj) => {
      const journeyObj = {
        destination: rawJourneyObj.legs[0].end_address,
        arrivalTimeText: rawJourneyObj.legs[0].arrival_time.text,
        departureTimeUTC: rawJourneyObj.legs[0].departure_time.value,
        transitSteps: rawJourneyObj.legs[0].steps.map((step) => {
          const stepObj = {
            instruction: step.html_instructions,
            mode: step.travel_mode,
            duration: step.duration.text,
          };
          return stepObj;
        }),
      };
      return journeyObj;
    });

    const journeysOffset = journeys
      .filter((journey) => {
        const currentTimeInSeconds = Date.now() / 1000;
        const diff = journey.departureTimeUTC - currentTimeInSeconds;
        const offset = 1.5;
        return diff >= offset;
      })
      .sort((a, b) => a - b);

    dispatch(removeJourneys(destinationId));
    dispatch(addJourneys(destinationId, journeysOffset));
  };
}

export function fetchJourneys(destinationId, origin, destination) {
  return async (dispatch, getState, { Api }) => {
    const json = await Api.fetchJourneys(origin, destination);

    const journeys = json.map((rawJourneyObj) => {
      const journeyObj = {
        destination: rawJourneyObj.legs[0].end_address,
        arrivalTimeText: rawJourneyObj.legs[0].arrival_time.text,
        departureTimeUTC: rawJourneyObj.legs[0].departure_time.value,
        transitSteps: rawJourneyObj.legs[0].steps.map((step) => {
          const stepObj = {
            instruction: step.html_instructions,
            mode: step.travel_mode,
            duration: step.duration.text,
            shortName: step.transit_details ? step.transit_details.line.short_name : '',
            agency: step.transit_details ? step.transit_details.line.agencies[0].name : '',
          };
          return stepObj;
        }),
      };
      return journeyObj;
    });

    dispatch(addJourneys(destinationId, journeys));
  };
}
