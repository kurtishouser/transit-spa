export default class Api {
  static fetchJourneys(origin, destination) {
    return fetch(
      `http://localhost:8000/directions?origin=${origin}&destination=${destination}&alternatives=true`,
    )
      .then(response => response.json())
      .catch(e => e);
  }

  static getCurrentLocation() {
    const getPosition = options => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

    return getPosition()
      .then((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const location = { lat, lng };
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
        return fetch(url)
        .then(response => response.json())
        .then((data) => {
          location.address = data.results[0].formatted_address;
          return location;
        })
        .catch(e => e);
      });
  }
}
