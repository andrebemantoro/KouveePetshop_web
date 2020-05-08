import Vue from 'vue';
import Router from 'vue-router';

const dashboardAdminLayout = () =>
  import('../components/Admin/dashboardAdminLayout.vue');
const dashboardCSLayout = () =>
  import('../components/Customer_service/dashboardCSLayout.vue');
const dashboardCashierLayout = () =>
  import('../components/Cashier/dashboardCashierLayout.vue');
const loginLayout = () => import('../components/Login.vue');
const landingPageLayout = () =>
  import('../components/Pelanggan/landingPage.vue');

function loadLayanan(view) {
  return () => import(`../components/Admin/layananLayout/${view}.vue`);
}
function loadPegawai(view) {
  return () => import(`../components/Admin/pegawaiLayout/${view}.vue`);
}
function loadPengadaan(view) {
  return () => import(`../components/Admin/pengadaanLayout/${view}.vue`);
}
function loadProduk(view) {
  return () => import(`../components/Admin/produkLayout/${view}.vue`);
}
function loadSupplier(view) {
  return () => import(`../components/Admin/supplierLayout/${view}.vue`);
}
function loadUkuran(view) {
  return () => import(`../components/Admin/ukuranLayout/${view}.vue`);
}
function loadJenis(view) {
  return () => import(`../components/Admin/jenisHewanLayout/${view}.vue`);
}
function loadHewan(view) {
  return () => import(`../components/Customer_service/hewanLayout/${view}.vue`);
}
function loadPelanggan(view) {
  return () =>
    import(`../components/Customer_service/pelangganLayout/${view}.vue`);
}
function loadTransaksi(view) {
  return () =>
    import(`../components/Customer_service/transaksiLayout/${view}.vue`);
}
function loadTransaksiProduk(view) {
  return () =>
    import(`../components/Cashier/transaksiProdukLayout/${view}.vue`);
}
function loadTransaksiLayanan(view) {
  return () =>
    import(`../components/Cashier/transaksiLayananLayout/${view}.vue`);
}

const routes = [
  {
    path: '/',
    component: landingPageLayout,
    children: [
      {
        name: 'landingPage',
        path: '/',
      },
    ],
  },
  {
    path: '/LoginAdmin',
    component: loginLayout,
    children: [
      {
        name: 'Login',
        path: '/LoginAdmin',
      },
    ],
  },
  {
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem('Nama') != null) {
        next();
      } else {
        sessionStorage.removeItem('Nama');
        sessionStorage.removeItem('Id');
        next({ path: '/LoginAdmin' });
      }
    },
    path: '/MenuAdmin',
    component: dashboardAdminLayout,
    children: [
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Layanan',
        path: '/MenuLayanan',
        component: loadLayanan('MenuLayanan'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Pegawai',
        path: '/MenuPegawai',
        component: loadPegawai('MenuPegawai'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Pengadaan',
        path: '/MenuPengadaan',
        component: loadPengadaan('MenuPengadaan'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'PengadaanDiproses',
        path: '/PengadaanDiproses',
        component: loadPengadaan('PengadaanDiproses'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'PengadaanSelesai',
        path: '/PengadaanSelesai',
        component: loadPengadaan('PengadaanSelesai'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Produk',
        path: '/MenuProduk',
        component: loadProduk('MenuProduk'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Supplier',
        path: '/MenuSupplier',
        component: loadSupplier('MenuSupplier'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Ukuran',
        path: '/MenuUkuran',
        component: loadUkuran('MenuUkuran'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') == 'admin') {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Jenis',
        path: '/MenuJenis',
        component: loadJenis('MenuJenisHewan'),
      },
    ],
  },
  {
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem('Nama') != null) {
        next();
      } else {
        sessionStorage.removeItem('Nama');
        sessionStorage.removeItem('Id');
        next({ path: '/LoginAdmin' });
      }
    },
    path: '/MenuCustomerService',
    component: dashboardCSLayout,
    children: [
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') != null) {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Pelanggan',
        path: '/MenuPelanggan',
        component: loadPelanggan('MenuPelanggan'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') != null) {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Hewan',
        path: '/MenuHewan',
        component: loadHewan('MenuHewan'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') != null) {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'Transkasi',
        path: '/MenuTransaksi',
        component: loadTransaksi('MenuTransaksi'),
      },
    ],
  },
  {
    beforeEnter(to, from, next) {
      if (sessionStorage.getItem('Nama') != null) {
        next();
      } else {
        sessionStorage.removeItem('Nama');
        sessionStorage.removeItem('Id');
        next({ path: '/LoginAdmin' });
      }
    },
    path: '/MenuCashier',
    component: dashboardCashierLayout,
    children: [
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') != null) {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'TransaksiProduk',
        path: '/MenuTransaksiProduk',
        component: loadTransaksiProduk('MenuTransaksiProduk'),
      },
      {
        beforeEnter(to, from, next) {
          if (sessionStorage.getItem('Nama') != null) {
            next();
          } else {
            sessionStorage.removeItem('Nama');
            sessionStorage.removeItem('Id');
            next({ path: '/LoginAdmin' });
          }
        },
        name: 'TransaksiLayanan',
        path: '/MenuTransaksiLayanan',
        component: loadTransaksiLayanan('MenuTransaksiLayanan'),
      },
    ],
  },
];

Vue.use(Router);

const router = new Router({ mode: 'history', routes: routes });

export default router;
