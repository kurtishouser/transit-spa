import { combineReducers } from 'redux';
import * as TYPES from '../constants/constants';

// export function configuration(state = { currentLocation:
//   { address: '', lat: null, lng: null } }, action) {
export function configuration(
  state = { currentLocation: {
    address: '44 Tehama St, San Francisco, CA 94105',
    lat: 37.7873889,
    lng: -122.3964106 },
  }, action) {
  switch (action.type) {
    case TYPES.UPDATE_CURRENT_LOCATION:
      return {
        currentLocation: { ...state.currentLocation,
          address: action.currentLocation.address,
          lat: action.currentLocation.lat,
          lng: action.currentLocation.lng,
        },
      };

    default:
      return state;
  }
}

export function destinations(state = { ids: [], byId: {} }, action) {
  const newDestinationsById = {};
  let destinationsIdsToKeep = [];
  let nextId;
  switch (action.type) {
    case TYPES.ADD_DESTINATION:
      nextId = state.ids.length ? Math.max(...state.ids) + 1 : 1;

      newDestinationsById.id = nextId;
      newDestinationsById.address = action.destination;

      return {
        ids: [...state.ids, nextId],
        byId: { ...state.byId, [nextId]: newDestinationsById },
      };

    case TYPES.REMOVE_DESTINATION:
      destinationsIdsToKeep = state.ids.filter(id => id !== action.destinationId);
      return {
        ids: [...destinationsIdsToKeep],
        byId: { ...state.byId },
      };

    default:
      return state;
  }
}

export function journeys(state = { byDestinationId: {} }, action) {
  const dId = action.destinationId;
  let journeysForDest;
  const newJourneysByDestinationId = {};
  switch (action.type) {
    case TYPES.ADD_JOURNEYS:
      if (state.byDestinationId[dId]) {
        journeysForDest = [...state.byDestinationId[dId], ...action.journeys];
      } else {
        journeysForDest = action.journeys;
      }
      newJourneysByDestinationId[dId] = journeysForDest;
      return {
        byDestinationId: { ...state.byDestinationId, ...newJourneysByDestinationId },
      };

    case TYPES.REMOVE_JOURNEYS:
      newJourneysByDestinationId[dId] = [];
      return {
        byDestinationId: { ...state.byDestinationId, ...newJourneysByDestinationId },
      };

    default:
      return state;
  }
}

export default combineReducers({
  configuration,
  destinations,
  journeys,
});
