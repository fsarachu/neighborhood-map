import loadGoogleMapsAPI from 'load-google-maps-api';
import MapStore from '../../store/MapStore';

class Map {
  constructor() {
    this.store = {
      map: MapStore,
    };
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
      center: this.store.map.center(),
      zoom: this.store.map.zoom(),
    });
  }
}

export default {
  viewModel: Map,
  template: require('./map.html')
};
