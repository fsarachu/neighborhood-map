import swal from "sweetalert2";
import NeighborhoodService from "../../services/NeighborhoodService";

class Welcome {

  constructor(ctx) {
    this.showWelcomeMessage();
  }

  createHood() {
    let service = new NeighborhoodService();
    service.save({
      name: 'My Neighborhood',
      position: {
        lat: 12.32131,
        lng: 3.31312
      }
    });
  }

  showWelcomeMessage() {
    swal({
      title: 'Welcome!',
      text: 'It looks like it\'s your first time here... Let\'s create your neighborhood!',
      confirmButtonText: 'Get Started',
      confirmButtonClass: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored',
      buttonsStyling: false,
    });

  }

}

export default {
  viewModel: Welcome,
  template: require('./welcome.html')
};
