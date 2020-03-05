/* eslint-disable */
<template>
  <v-app>
<<<<<<< HEAD
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
      </div>
=======
    <v-app-bar app color="green" dark>
      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="15-dog-png-image-picture-download-dogs-thumb.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div> -->
>>>>>>> b51b29d0779a17fe1e1a92dc61bb07217b571322

      <v-spacer></v-spacer>

      
    </v-app-bar>

    <v-content>
      <Login />
    </v-content>
  </v-app>
</template>

<script>
import Login from "./components/Login";

export default {
  name: "App",

  components: {
    Login
  },

  data: () => ({
    //
  })
};
</script>
