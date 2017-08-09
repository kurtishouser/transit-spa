import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import nock from 'nock';
import * as TYPES from '../constants/constants';
import * as actions from './index';

describe('actions', () => {
  it('should create an action to update current location', () => {
    const location = {
      address: '44 Tehama St, San Francisco, CA 94105',
    };

    const expectedAction = {
      type: TYPES.UPDATE_CURRENT_LOCATION,
      currentLocation: {
        address: '44 Tehama St, San Francisco, CA 94105',
      },
    };

    expect(actions.updateCurrentLocation(location)).toEqual(expectedAction);
  });

  it('should create an action to add a destination', () => {
    const destination = 'SFO, San Francisco, CA 94128';

    const expectedAction = {
      type: TYPES.ADD_DESTINATION,
      destination: 'SFO, San Francisco, CA 94128',
    };

    expect(actions.addDestination(destination)).toEqual(expectedAction);
  });

  it('should create an action to add journeys for a destination', () => {
    const destinationId = 5;
    const journeys = [
      { departureTime: '07:50am', arrivalTime: '08:30am' },
      { departureTime: '08:00am', arrivalTime: '08:40am' },
      { departureTime: '08:10am', arrivalTime: '08:50am' },
    ];

    const expectedAction = {
      type: TYPES.ADD_JOURNEYS,
      destinationId: 5,
      journeys: [
        { departureTime: '07:50am', arrivalTime: '08:30am' },
        { departureTime: '08:00am', arrivalTime: '08:40am' },
        { departureTime: '08:10am', arrivalTime: '08:50am' },
      ],
    };

    expect(actions.addJourneys(destinationId, journeys)).toEqual(expectedAction);
  });

  it('should create an action to remove all journeys for a destination', () => {
    const destinationId = 5;

    const expectedAction = {
      type: TYPES.REMOVE_JOURNEYS,
      destinationId: 5,
    };

    expect(actions.removeJourneys(destinationId)).toEqual(expectedAction);
  });

  it('should create an action to remove a destination', () => {
    const destinationId = 5;

    const expectedAction = {
      type: TYPES.REMOVE_DESTINATION,
      destinationId: 5,
    };

    expect(actions.removeDestination(destinationId)).toEqual(expectedAction);
  });

  it('should fetch journeys from API', () => {
    const mockApiFetchJourneys = jest.fn();
    mockApiFetchJourneys.mockReturnValue(
      Promise.resolve([
        {
          legs: [
            {
              end_address: '123 Main st',
              arrival_time: { text: '11:41am' },
              departure_time: { value: 1501871210 },
              steps: [
                {
                  html_instructions: 'Walk to Montgomery St. Station',
                  travel_mode: 'WALKING',
                  duration: { text: '8 mins' },
                },
              ],
            },
          ],
        },
      ]),
    );

    const extraArgument = {
      Api: {
        fetchJourneys: mockApiFetchJourneys,
      },
    };

    const initialState = {
      configuration: {
        currentLocation: {
          address: '44 Tehama St, San Francisco, CA 94105',
        },
      },
      destinations: {
        ids: [5],
        byId: {
          5: {
            id: 5,
            address: 'SFO, San Francisco, CA 94128',
          },
        },
      },
      journeys: {
        byDestinationId: {},
      },
    };

    const expectedActions = [
      {
        type: TYPES.ADD_JOURNEYS,
        destinationId: 5,
        journeys: [
          {
            destination: '123 Main st',
            arrivalTimeText: '11:41am',
            departureTimeUTC: 1501871210,
            transitSteps: [
              {
                instruction: 'Walk to Montgomery St. Station',
                mode: 'WALKING',
                duration: '8 mins',
              },
            ],
          },
        ],
      },
    ];

    const mockStore = configureStore([thunk.withExtraArgument(extraArgument)]);
    const store = mockStore(initialState);

    return store.dispatch(actions.fetchJourneys(5, 'home', 'work')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
