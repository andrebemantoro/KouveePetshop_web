<template>
  <v-app>
    <main class="main">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
  };
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
  }
</style>
