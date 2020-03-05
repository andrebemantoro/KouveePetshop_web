import Vue from "vue";
import Router from "vue-router";
// import { loadavg } from 'os'

const dashboardLayout = () =>
  import(
    /* webpackChunkName: "dashboard" */ "../components/dashboardLayout.vue"
  );
const Login = () =>
  import(/* webpackChunkName: "dashboard" */ "../components/Login.vue");

function loadView(view) {
  return () =>
    import(
      /* webpackChunkName: "view-[request]" */ `../components/${view}.vue`
    );
}

const routes = [
  {
    path: "/components/Login.vue",
    component: Login
  },

  {
    path: "/components/dashboardLayout.vue",
    component: dashboardLayout,
    children: [
      {
        name: "UserController",
        path: "/userController",
        component: loadView("userController")
      },

      {
        name: "SparepartController",
        path: "/sparepartController",
        component: loadView("sparepartController")
      }
    ]
  }
];
Vue.use(Router);

const router = new Router({ mode: "history", routes: routes });

export default router;
