import loadGoogleMapsAPI from 'load-google-maps-api';

class Map {
  constructor() {
    this.googleMaps = null;
    this.map = null;

    loadGoogleMapsAPI({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'})
      .then(gmaps => {
        this.googleMaps = gmaps;
        this.init();
      })
      .catch(e => console.error(e));
  }

  init() {
    this.map = new this.googleMaps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
}

export default {
  viewModel: Map,
  template: require('./map.html')
};
