<template>
  <v-app>
    <LeftDrawer />
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
import LeftDrawer from "./components/LeftDrawer.vue";
import AppBar from "./components/AppBar.vue";
import Footer from "./components/Footer.vue";
</script>
