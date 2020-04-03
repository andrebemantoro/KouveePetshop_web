<template>
  <v-app>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
<style scoped>
.v-toolbar__content, .v-toolbar__extension{
   background-color: azure;
 }
</style>

