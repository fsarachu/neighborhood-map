import dialogPolyfill from "dialog-polyfill";

class WelcomeDialog {

  constructor() {
    this.dialog = document.querySelector('.welcome-dialog');
    this.init();
  }

  init() {
    this.polyfill();
  }

  polyfill() {
    if (!('showModal' in this.dialog)) {
      dialogPolyfill.registerDialog(this.dialog);
    }
  }

  getStarted() {
    // this.channels.app.publish('welcomeDialog', {show: false});
  }

}

export default {
  viewModel: WelcomeDialog,
  template: require('./welcomeDialog.html')
}
