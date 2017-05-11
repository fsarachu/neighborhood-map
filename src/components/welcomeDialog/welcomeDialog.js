import dialogPolyfill from "dialog-polyfill";
import postal from 'postal';

class WelcomeDialog {

  constructor() {
    this.channels = {
      app: postal.channel('app'),
    };
    this.dialog = document.querySelector('.welcome-dialog');
    this.init();
  }

  init() {
    this.polyfill();
    this.subscribeToPostal();
  }

  polyfill() {
    if (!('showModal' in this.dialog)) {
      dialogPolyfill.registerDialog(this.dialog);
    }
  }

  subscribeToPostal() {
    this.channels.app.subscribe('welcomeDialog', data => {
      if (data.show) {
        this.dialog.showModal();
      } else {
        this.dialog.close();
      }
    });
  }

  getStarted() {
    this.channels.app.publish('welcomeDialog', {show: false});
  }

}

export default {
  viewModel: WelcomeDialog,
  template: require('./welcomeDialog.html')
}
