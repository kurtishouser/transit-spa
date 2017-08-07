import React from 'react';
import { Grid, Container, Segment } from 'semantic-ui-react';
import CurrentLocation from './components/CurrentLocation/CurrentLocation';
import DestinationTable from './components/Destinations/DestinationTable';
import AddNewDestinationRow from './components/AddNewDestination/AddNewDestinationRow';
import './App.css';

const App = () =>
  (<div>
    <Container>
      <Grid padded centered>
        <Grid.Column id="content-container">
          <Grid.Row id="current-location-container">
            <CurrentLocation />
          </Grid.Row>

          <Grid.Row id="destinations-container">
            <DestinationTable />
          </Grid.Row>

          <Grid.Row id="new-destination-container">
            <Segment>
              <AddNewDestinationRow />
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Container>
  </div>);

export default App;
