import ko from "knockout";
import AppComponent from "../../components/app/app";
import GoogleMapComponent from "../../components/googleMap/googleMap";
import NeighborhoodMapComponent from "../../components/neighborhoodMap/neighborhoodMap";
import WelcomeDialogComponent from "../../components/welcomeDialog/welcomeDialog";

ko.components.register('app', AppComponent);
ko.components.register('app-google-map', GoogleMapComponent);
ko.components.register('app-neighborhood-map', NeighborhoodMapComponent);
ko.components.register('app-welcome-dialog', WelcomeDialogComponent);
