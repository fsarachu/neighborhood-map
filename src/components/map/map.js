import loadGoogleMapsAPI from 'load-google-maps-api';
import geolocator from 'geolocator';
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

    this.locate();
  }

  locate() {
    let options = {
      addressLookup: false,
      desiredAccuracy: 30,
      enableHighAccuracy: true,
      fallbackToIP: true,
      maximumAge: 0,
      maximumWait: 10000,
      staticMap: false,
      timeout: 5000,
      timezone: false,
    };

    geolocator.locate(options, (err, location) => {
      if (err) {
        console.log(err);
      }

      console.dir(location);
    });
  }
}

export default {
  viewModel: Map,
  template: require('./map.html')
};
