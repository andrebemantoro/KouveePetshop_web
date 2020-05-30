<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      width="300px"
      class="greydarken-3"
      grey
      app
      clipped
      fixed
      temporary
    >
      <v-list-item>
        <img
          src="../../assets/kouveepetshoplogo.png"
          style="height:45px;width:80px"
        />
        <v-list-item-content>
          <v-list-item-title class="title" style="margin-left:10px;">
            Kouvee Petshop
          </v-list-item-title>
          <v-list-item-subtitle style="margin-left:10px;">
            untuk Admin
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push(item.to).catch((error) => {})"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn color="#f9c99e" block @click="logout()">
            <v-icon>
              mdi-logout
            </v-icon>
            Keluar</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar light app fixed clipped-left height="70px" color="#fff4cb">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title bold>KOUVEE PETSHOP</v-toolbar-title>
      <VSpacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-badge
            :content="messages"
            :value="messages"
            color="red"
            overlap
            offset-y="20px"
          >
            <v-btn icon="" link="" v-on="on">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <v-list max-width="420px" three-line>
          <v-list-item
            v-for="(item, index) in produks"
            :key="index"
            @click="$router.push(item.to).catch((error) => {})"
            :disabled="checkOpened(item.id_notifikasi)"
          >
            <v-list-item-icon>
              <v-img
                :src="$apiUrl2 + 'produk/' + item.gambar"
                contain
                class="white"
                max-height="50"
                max-width="50"
              ></v-img>
            </v-list-item-icon>
            <v-list-item-content @click="updateStatus(item.id_notifikasi)">
              <v-list-item-title>
                {{ item.nama }}
              </v-list-item-title>
              <v-list-item-subtitle class="notifikasi-message">
                Segera lakukan pengadaan produk <br />untuk menambahkan stok
                yang tersedia.
              </v-list-item-subtitle>
              <v-list-item-subtitle class="notifikasi-message">
                {{ item.created_at }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="mx-5" icon="" link="" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in menus"
            :key="index"
            @click="$router.push(item.to).catch((error) => {})"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <VContent>
      <router-view />
    </VContent>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        drawer: null,
        menus: [
          {
            title: 'Stok Produk',
            icon: 'mdi-package-variant',
            to: '/StokProduk',
          },
          {
            title: 'Menu Laporan',
            icon: 'mdi-receipt',
            to: '/LaporanPengadaan',
          },
        ],
        items: [
          {
            title: 'Pegawai',
            icon: 'mdi-account',
            to: '/menuPegawai',
          },
          {
            title: 'Produk',
            icon: 'mdi-paw',
            to: '/menuProduk',
          },
          {
            title: 'Layanan',
            icon: 'mdi-dog-service',
            to: '/menuLayanan',
          },
          {
            title: 'Supplier',
            icon: 'mdi-package-variant-closed',
            to: '/menuSupplier',
          },
          {
            title: 'Ukuran Hewan',
            icon: 'mdi-ruler',
            to: '/menuUkuran',
          },
          {
            title: 'Jenis Hewan',
            icon: 'mdi-dog',
            to: '/menuJenis',
          },
          {
            title: 'Pengadaan',
            icon: 'mdi-plus-circle-multiple-outline',
            to: '/menuPengadaan',
          },
        ],
        produks: [],
        formProduks: new FormData(),
        messages: 0,
        opened: [],
        disabled: false,
      };
    },
    methods: {
      checkNotification() {
        for (let i = 0; i < this.produks.length; i++) {
          if (this.produks[i].status == 0) {
            this.messages++;
          } else {
            this.opened.push(this.produks[i].id_notifikasi);
          }
        }
        console.log(this.opened);
      },
      checkOpened(id_notifikasi) {
        for (let i = 0; i < this.opened.length; i++) {
          if (id_notifikasi === this.opened[i]) {
            return (this.disabled = true);
          }
        }
      },
      logout() {
        sessionStorage.removeItem('Nama');
        sessionStorage.removeItem('Id');
        this.$router.push({ name: 'Login' });
      },
      getDataNotifikasi() {
        var uri = this.$apiUrl + '/Notifikasi/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
          this.checkNotification();
        });
      },
      updateStatus(id_notifikasi) {
        var uri =
          this.$apiUrl + '/Notifikasi/' + 'updateStatus/' + id_notifikasi;
        this.load = true;
        this.$http
          .post(uri)
          .then((response) => {
            this.load = false;
            this.messages--;
          })
          .catch((error) => {
            this.load = false;
          });
      },
    },
    mounted() {
      this.getDataNotifikasi();
    },
  };
</script>

<style>
  .notif-title {
    white-space: normal;
  }
  .notifTitle {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .notifikasi-message {
    -webkit-line-clamp: unset !important;
  }
</style>
