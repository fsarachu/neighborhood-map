import Router from "ko-component-router";
import routes from "../../routes/routes";

Router.setConfig({
  base: '',
  hashbang: false,
});

Router.useRoutes(routes);
