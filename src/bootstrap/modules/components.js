import ko from "knockout";

import AppComponent from "../../app/components/app/app";
import GoogleMapComponent from "../../app/components/googleMap/googleMap";
import NeighborhoodMapComponent from "../../app/components/neighborhoodMap/neighborhoodMap";
import WelcomeDialogComponent from "../../app/components/welcomeDialog/welcomeDialog";

ko.components.register('app', AppComponent);
ko.components.register('app-google-map', GoogleMapComponent);
ko.components.register('app-neighborhood-map', NeighborhoodMapComponent);
ko.components.register('app-welcome-dialog', WelcomeDialogComponent);
