import ko from "knockout";
import NeighborhoodService from "../../services/NeighborhoodService";

class App {
  constructor() {
    this.neighborhood = ko.observable(NeighborhoodService.get());
    this.showWelcomeDialog = ko.observable(!this.neighborhood());
    this.menuTitle = ko.computed(() => this.neighborhood() ? this.neighborhood().name() : 'My Neighborhood');
    this.showMenu = ko.computed(() => !!this.neighborhood());
  }

}

export default {
  viewModel: App,
  template: require('./app.html')
};
