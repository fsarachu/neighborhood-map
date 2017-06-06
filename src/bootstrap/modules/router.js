import Router from "ko-component-router";
import routes from "../../router/routes";

Router.setConfig({
  base: '',
  hashbang: false,
});

Router.useRoutes(routes);
