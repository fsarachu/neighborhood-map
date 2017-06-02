import ko from "knockout";

import HomePage from "../../app/views/home/home";
import WelcomePage from "../../app/views/welcome/welcome";

ko.components.register('home-page', HomePage);
ko.components.register('welcome-page', WelcomePage);
