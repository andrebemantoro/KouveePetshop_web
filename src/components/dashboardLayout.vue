<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      class="greydarken-3"
      dark
      app
      clipped
      fixed
      temporary
    >
      <v-list-item>
        <img src="../assets/paw.png" style="height:45px;width:45px" />
        <v-list-item-content>
          <v-list-item-title class="title" style="margin-left:10px;">
            Kouvee Petshop
          </v-list-item-title>
          <v-list-item-subtitle style="margin-left:10px;">
            {{ name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push(item.to)"
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
          <v-btn block @click="logout()">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar dark app fixed clipped-left height="70px" color="grey darken-3">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <VSpacer />
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
      items: [
        {
          title: "Pegawai",
          icon: "mdi-account",
          to: "/menuPegawai"
        },
        {
          title: "Produk",
          icon: "mdi-paw",
          to: "/menuProduk"
        },
        {
          title: "Layanan",
          icon: "mdi-dog-service",
          to: "/menuLayanan"
        },
        {
          title: "Supplier",
          icon: "mdi-package-variant-closed",
          to: "/menuSupplier"
        },
        {
          title: "Ukuran",
          icon: "mdi-ruler",
          to: "/menuUkuran"
        },
        {
          title: "Pengadaan",
          icon: "mdi-plus-circle-multiple-outline",
          to: "/menuPengadaan"
        },
        {
          title: "Hewan",
          icon: "mdi-dog",
          to: "/menuHewan"
        }
      ]
    };
  },
  created() {
    this.name = localStorage.getItem("name");
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
