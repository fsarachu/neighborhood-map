import swal from "sweetalert2";

class Welcome {

  constructor(ctx) {
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
