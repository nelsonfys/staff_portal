<template>
  <v-app>
    <LeftDrawer v-if="!mobile" />
    <AppBar />
    <v-main>
      <v-container fluid class="pa-6 fill-height">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
    <BottomNavigation v-if="mobile" />
  </v-app>
</template>

<script lang="ts" setup>
import LeftDrawer from "./components/LeftDrawer.vue";
import AppBar from "./components/AppBar.vue";
import Footer from "./components/Footer.vue";
import { useDisplay } from "vuetify";
import BottomNavigation from "./components/BottomNavigation.vue";

const { mobile } = useDisplay();
</script>
