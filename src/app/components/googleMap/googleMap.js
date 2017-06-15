import ko from "knockout";
import loadGoogleMapsAPI from "load-google-maps-api";

class GoogleMap {
  constructor(params) {
    this.center = params.center;
    this.zoom = params.zoom;
    this.map = ko.observable(null);
    this.isLoading = ko.computed(() => !this.map);
    this.init();
  }

  init() {
    if (!GoogleMap.api) { //TODO: Improve this section. Tidy up with a promise or something
      this.loadMap();
    } else {
      this.createMap();
    }

    this.subscribeToObservables();
  }

  loadMap() {
    loadGoogleMapsAPI({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'})
      .then(gmaps => {
        GoogleMap.api = gmaps;
        this.createMap();
      })
      .catch(e => console.error(e));
  }

  createMap() {
    let map = new GoogleMap.api.Map(document.getElementById('map'), {
      center: new GoogleMap.api.LatLng(this.center().lat(), this.center().lng()),
      zoom: this.zoom(),
    });

    this.map(map);
    this.registerMapListeners();
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
        this.map().setCenter(new GoogleMap.api.LatLng(value.lat(), value.lng()));
      }
    });

    this.center().lat.subscribe(value => {
      if (this.map()) {
        console.log('Updated center.lat');
        this.map().setCenter(new GoogleMap.api.LatLng(value, this.center().lng()));
      }
    });

    this.center().lng.subscribe(value => {
      if (this.map()) {
        console.log('Updated center.lng');
        this.map().setCenter(new GoogleMap.api.LatLng(this.center().lat(), value));
      }
    });
  }

  registerMapListeners() {
    // GoogleMap.api.event.addListener(this.map(), 'click', e => this.channel.publish('mapClick', e));
  }

}

GoogleMap.api = null;

export default {
  viewModel: GoogleMap,
  template: require('./googleMap.html')
};
