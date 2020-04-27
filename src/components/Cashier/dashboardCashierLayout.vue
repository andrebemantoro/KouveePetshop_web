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
            untuk Customer Service
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
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
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
      collapseOnScroll: true,
      drawer: null,
      items: [
        {
          title: 'Transaksi Produk',
          icon: 'mdi-cash-multiple',
          to: '/menuTransaksiProduk',
        },
        {
          title: 'Transaksi Layanan',
          icon: 'mdi-cash-multiple',
          to: '/menuTransaksiLayanan',
        },
      ],
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem('Nama');
      sessionStorage.removeItem('Id');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
