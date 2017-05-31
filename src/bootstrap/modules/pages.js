import ko from "knockout";
import HomePage from "../../pages/home/home";
import WelcomePage from "../../pages/welcome/welcome";

ko.components.register('home-page', HomePage);
ko.components.register('welcome-page', WelcomePage);
