import Vue from "vue";
import Router from "vue-router";
// import { loadavg } from 'os'

const dashboardLayout = () => import('../components/dashboardLayout.vue')
// const adminDashboard = () => import('../components/adminDashboard.vue')
// const userDashboard = () => import('../components/userDashboard.vue')


function loadView(view){
    return()=>import(`../components/LoginLayout/${view}.vue`)
}

// function loadMe(view){
//     return() =>import(`../components/homeContents/${view}.vue`)
// }

// function loadViews(view){
// 	return()=>import(`../components/userDashboardContents/${view}.vue`)
// }
const routes = [
  {
      path:'/',
      component: dashboardLayout,
      children: [
          {
              name: 'Login',
              path: '/LoginLayout',
              component: loadView('Login')
          },
      ]
  },
  {
    path: '/Menu',
    component: loadView('Menu'),
    name: 'Menu',

    
  },
]

Vue.use(Router);

const router = new Router({ mode: "history", routes: routes });

export default router;
