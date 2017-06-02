import ko from "knockout";

import HomePage from "../../app/pages/home/home";
import WelcomePage from "../../app/pages/welcome/welcome";

ko.components.register('home-page', HomePage);
ko.components.register('welcome-page', WelcomePage);
