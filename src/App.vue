/* eslint-disable */
<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <div class="d-flex align-center">
      </div>

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
