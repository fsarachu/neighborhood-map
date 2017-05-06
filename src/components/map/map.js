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
  constructor() {
    this.googleMaps = null;
    this.map = ko.observable(null);
    this.center = {
      lat: ko.observable(0),
      lng: ko.observable(0)
    };
    this.zoom = ko.observable(2);

    setTimeout(() => {
      console.log("Timeout!");
      this.zoom(4);
    }, 5000);
  }

  parseOptions(options) {
    if (options.center && options.center.lat) {
      this.center.lat(Number.parseFloat(options.center.lat));
    }

    if (options.center && options.center.lng) {
      this.center.lng(Number.parseFloat(options.center.lng));
    }

    if (options.zoom) {
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
      this.zoom(15);
    });
  }
}

export default {
  viewModel: Map,
  template: require('./map.html')
};
