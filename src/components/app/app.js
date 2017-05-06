import ko from 'knockout';
import LocationService from "../../services/LocationService";

class App {
  constructor() {
    this.center = {
      lat: ko.observable(0),
      lng: ko.observable(0),
    };
    this.zoom = ko.observable(2);
    this.services = {
      location: LocationService,
    };
  }
}

export default {
  viewModel: App,
  template: require('./app.html')
};
