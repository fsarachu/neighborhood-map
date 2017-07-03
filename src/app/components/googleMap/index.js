import "./styles.css";
import postal from "postal";
import loadGoogleMapsAPI from "load-google-maps-api";

class GoogleMap {

  constructor(params) {
    this.center = params.center;
    this.zoom = params.zoom;
    this.map = null;
    this.postalChannel = postal.channel('googleMap');
    this.init();
  }

  init() {
    let createMap = this.loadMap().then(() => this.createMap());

    createMap.then(() => {
      this.registerMapListeners();
      this.subscribeToObservables();
    });
  }

  loadMap() {
    return new Promise((resolve) => {

      if (GoogleMap.api) {
        return resolve();
      }

      let loadApi = loadGoogleMapsAPI({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'}).then((api) => GoogleMap.api = api);

      loadApi.then(resolve);

    });
  }

  createMap() {
    let options = {
      center: new GoogleMap.api.LatLng(this.center().lat(), this.center().lng()),
      zoom: this.zoom(),
    };

    this.map = new GoogleMap.api.Map(document.getElementById('map'), options);

    return Promise.resolve();
  }

  subscribeToObservables() {
    this.zoom.subscribe(value => {
      console.log('Updated zoom');
      this.map.setZoom(value);
    });

    this.center.subscribe(value => {
      console.log('Updated center');
      this.map.setCenter(new GoogleMap.api.LatLng(value.lat(), value.lng()));
    });

    this.center().lat.subscribe(value => {
      console.log('Updated center.lat');
      this.map.setCenter(new GoogleMap.api.LatLng(value, this.center().lng()));
    });

    this.center().lng.subscribe(value => {
      console.log('Updated center.lng');
      this.map.setCenter(new GoogleMap.api.LatLng(this.center().lat(), value));
    });
  }

  registerMapListeners() {

    GoogleMap.api.event.addListener(this.map, 'click', (e) => {
      let coords = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      this.postalChannel.publish('map.click', coords);
    });

  }

}

GoogleMap.api = null;

export default {
  viewModel: GoogleMap,
  template: require('./template.html')
};
