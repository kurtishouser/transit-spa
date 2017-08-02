import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
    };
    this.onChange = address => this.setState({ address });
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(address) {
    this.setState({
      address,
      loading: true,
    });

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then((latLng) => {
        // console.log('Success', latLng);
        const { lat, lng } = latLng;
        fetch(`http://localhost:8000/directions?origin=37.7873889,-122.3964106&destination=${lat},${lng}`)
          .then(response => response.json())
          .then((data) => {
            console.log(data);
          });
      })
      .catch(error => console.error('Error', error));
  }

  render() {
    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className="fa fa-map-marker Demo__suggestion-icon" />
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      autoFocus: true,
      placeholder: 'Where to?',
      name: 'Demo__input',
      id: 'my-input-id',
    };

    return (
      <div className="container">
        <PlacesAutocomplete
          onSelect={this.handleSelect}
          autocompleteItem={AutocompleteItem}
          onEnterKeyDown={this.handleSelect}
          classNames={cssClasses}
          inputProps={inputProps}
        />
        {this.state.loading
          ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
        {!this.state.loading && this.state.geocodeResults ?
          <div className="geocoding-results">{this.state.geocodeResults}</div> :
          null}
      </div>
    );
  }
}

export default SimpleForm
