<template>
  <v-app>
    <LeftDrawer />
    <AppBar />
    <v-main>
      <v-container fluid class="pa-6 fill-height">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts" setup>
import LeftDrawer from "./components/LeftDrawer.vue";
import AppBar from "./components/AppBar.vue";
import Footer from "./components/Footer.vue";
</script>
