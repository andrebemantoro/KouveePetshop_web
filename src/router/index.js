import Vue from "vue";
import Router from "vue-router";
// import { loadavg } from 'os'

const dashboardLayout = () => import('../components/dashboardLayout.vue')
const loginLayout = () => import('../components/Login.vue')
// const adminDashboard = () => import('../components/adminDashboard.vue')
// const userDashboard = () => import('../components/userDashboard.vue')


function loadView(view){
    return()=>import(`../components/${view}.vue`)
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
      component: loginLayout,
      children: [
          {
              name: 'Login',
              path: '',
           
          },
      ]
  },
  {
    path:'/menu',
    component: dashboardLayout,
    children: [
        {
            name: 'Menu',
            path: '/menu',
            component: loadView('Menu')
         
        },
    ]
},
]

Vue.use(Router);

const router = new Router({ mode: "history", routes: routes });

export default router;
