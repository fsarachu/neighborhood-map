import ko from 'knockout';
import loadGoogleMapsAPI from 'load-google-maps-api';
import geolocator from 'geolocator';

ko.bindingHandlers.map = {
  init(element, value, all, vm) {
    vm.loadMap();
  },
  update (element, value, all, vm) {
    let map = ko.unwrap(all.get('map'));

    if (map) {
      map.setZoom(ko.unwrap(all.get('zoom')));
      map.setCenter({
        lat: ko.unwrap(all.get('lat')),
        lng: ko.unwrap(all.get('lng')),
      });
    }

  }
}

class Map {
  constructor(params) {
    this.googleMaps = null;
    this.map = ko.observable(null);
    this.center = params.center;
    this.zoom = params.zoom;
    this.isLoading = ko.computed(() => !this.map());
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

}

export default {
  viewModel: Map,
  template: require('./googleMap.html')
};
