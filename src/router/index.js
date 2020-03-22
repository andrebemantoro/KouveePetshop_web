import Vue from "vue";
import Router from "vue-router";
// import { loadavg } from 'os'

const dashboardLayout = () => import("../components/dashboardLayout.vue");
const loginLayout = () => import("../components/Login.vue");

function loadHewan(view) {
  return () => import(`../components/hewanLayout/${view}.vue`);
}
function loadLayanan(view) {
  return () => import(`../components/layananLayout/${view}.vue`);
}
function loadPegawai(view) {
  return () => import(`../components/pegawaiLayout/${view}.vue`);
}
function loadPengadaan(view) {
  return () => import(`../components/pengadaanLayout/${view}.vue`);
}
function loadProduk(view) {
  return () => import(`../components/produkLayout/${view}.vue`);
}
function loadSupplier(view) {
  return () => import(`../components/supplierLayout/${view}.vue`);
}
function loadUkuran(view) {
  return () => import(`../components/ukuranLayout/${view}.vue`);
}

const routes = [
  {
    path: "/",
    component: loginLayout,
    children: [
      {
        name: "Login",
        path: ""
      }
    ]
  },
  {
    path: "/Menu",
    component: dashboardLayout,
    children: [
      {
        name: "Hewan",
        path: "/MenuHewan",
        component: loadHewan("MenuHewan")
      },
      {
        name: "Layanan",
        path: "/MenuLayanan",
        component: loadLayanan("MenuLayanan")
      },
      {
        name: "Pegawai",
        path: "/MenuPegawai",
        component: loadPegawai("MenuPegawai")
      },
      {
        name: "Pengadaan",
        path: "/MenuPengadaan",
        component: loadPengadaan("MenuPengadaan")
      },
      {
        name: "Produk",
        path: "/MenuProduk",
        component: loadProduk("MenuProduk")
      },
      {
        name: "Supplier",
        path: "/MenuSupplier",
        component: loadSupplier("MenuSupplier")
      },
      {
        name: "Ukuran",
        path: "/MenuUkuran",
        component: loadUkuran("MenuUkuran")
      }
    ]
  }
];

Vue.use(Router);

const router = new Router({ mode: "history", routes: routes });

export default router;
