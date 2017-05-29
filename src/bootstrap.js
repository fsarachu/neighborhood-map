// Import external packages
import "material-design-lite/dist/material";
import ko from "knockout";
// Import components
import AppComponent from "./components/app/app";
import WelcomeDialogComponent from "./components/welcomeDialog/welcomeDialog";
import GoogleMapComponent from "./components/googleMap/googleMap";
import NeighborhoodMapComponent from "./components/neighborhoodMap/neighborhoodMap";

// Register components
ko.components.register('app', AppComponent);
ko.components.register('app-welcome-dialog', WelcomeDialogComponent);
ko.components.register('app-google-map', GoogleMapComponent);
ko.components.register('app-neighborhood-map', NeighborhoodMapComponent);

// Apply bindings
ko.applyBindings();
