import ko from 'knockout';
import loadGoogleMapsAPI from 'load-google-maps-api';
import geolocator from 'geolocator';

ko.bindingHandlers.map = {
  init(element, value, all, vm) {
    let options = {
      center: {
        lat: ko.unwrap(all.get('lat')),
        lng: ko.unwrap(all.get('lng')),
      },
      zoom: ko.unwrap(all.get('zoom')),
      geolocate: ko.unwrap(all.get('geolocate')),
    };

    vm.loadMap(options);
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

  parseOptions(options) {
    if ('center' in options && 'lat' in options.center) {
      this.center.lat(Number.parseFloat(options.center.lat));
    }

    if ('center' in options && 'lng' in options.center) {
      this.center.lng(Number.parseFloat(options.center.lng));
    }

    if ('zoom' in options) {
      this.zoom(Number.parseInt(options.zoom));
    }
  }

  loadMap(options) {
    this.parseOptions(options);

    loadGoogleMapsAPI({key: 'AIzaSyClOMwnqYq0BzWIu4XvFHY_FJ20w3PZ5cw'})
      .then(gmaps => {
        this.googleMaps = gmaps;
        this.createMap(options.geolocate);
      })
      .catch(e => console.error(e));
  }

  createMap(geolocate) {
    let map = new this.googleMaps.Map(document.getElementById('map'), {
      center: new this.googleMaps.LatLng(this.center.lat(), this.center.lng()),
      zoom: this.zoom(),
    });

    this.map(map);

    if (geolocate) {
      this.geolocate();
    }
  }

  geolocate() {
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

      this.center.lat(location.coords.latitude);
      this.center.lng(location.coords.longitude);
      this.zoom(14);
    });
  }
}

export default {
  viewModel: Map,
  template: require('./googleMap.html')
};
