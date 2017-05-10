import ko from "knockout";
import loadGoogleMapsAPI from "load-google-maps-api";

class Map {
  constructor(params) {
    this.googleMaps = null;
    this.map = ko.observable(null);
    this.center = params.center;
    this.zoom = params.zoom;
    this.isLoading = ko.computed(() => !this.map());
    this.loadMap();
    this.subscribeToObservables();
  }

  loadMap() {
    loadGoogleMapsAPI({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'})
      .then(gmaps => {
        this.googleMaps = gmaps;
        this.createMap();
      })
      .catch(e => console.error(e));
  }

  createMap() {
    let map = new this.googleMaps.Map(document.getElementById('map'), {
      center: new this.googleMaps.LatLng(this.center().lat(), this.center().lng()),
      zoom: this.zoom(),
    });

    this.map(map);
  }

  subscribeToObservables() {
    this.zoom.subscribe(value => {
      if (this.map()) {
        console.log('Updated zoom');
        this.map().setZoom(value);
      }
    });

    this.center.subscribe(value => {
      if (this.map()) {
        console.log('Updated center');
        this.map().setCenter(new this.googleMaps.LatLng(value.lat(), value.lng()));
      }
    });

    this.center().lat.subscribe(value => {
      if (this.map()) {
        console.log('Updated center.lat');
        this.map().setCenter(new this.googleMaps.LatLng(value, this.center().lng()));
      }
    });

    this.center().lng.subscribe(value => {
      if (this.map()) {
        console.log('Updated center.lng');
        this.map().setCenter(new this.googleMaps.LatLng(this.center().lat(), value));
      }
    });
  }

}

export default {
  viewModel: Map,
  template: require('./googleMap.html')
};
