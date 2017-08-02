import React, { Component } from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';

/* eslint-disable react/prefer-stateless-function */

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Welcome to the Transit SPA</h2>
        <Autocomplete />
      </div>
    );
  }
}

export default App;
