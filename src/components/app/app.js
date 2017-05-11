import ko from "knockout";
import postal from "postal";
import NeighborhoodService from "../../services/NeighborhoodService";

class App {
  constructor() {
    this.channels = {
      app: postal.channel('app'),
      googleMap: postal.channel('googleMap'),
    };
    this.neighborhood = ko.observable(NeighborhoodService.get());
    this.menuTitle = ko.computed(() => this.neighborhood() ? this.neighborhood().name() : 'My Neighborhood');
    this.showMenu = ko.computed(() => !!this.neighborhood());
    this.init();
  }

  init() {
    this.postalSubscribe();
    if (!this.neighborhood()) {
      console.log('no neighborhood..');
      setTimeout(() => this.channels.app.publish('welcomeDialog', {show: true}), 0); // Send to event queue
    }
  }

  postalSubscribe() {
    this.channels.googleMap.subscribe("mapClick", function (data, envelope) {
      console.log('From app:', data);
    });
  }

}

export default {
  viewModel: App,
  template: require('./app.html')
};
