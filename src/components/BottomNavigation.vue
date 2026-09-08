<template>
  <v-bottom-navigation v-model="value" mode="shift">
    <v-btn>
      <v-icon>mdi-television-play</v-icon>

      <span>Video</span>
    </v-btn>

    <v-btn>
      <v-icon>mdi-music-note</v-icon>

      <span>Music</span>
    </v-btn>

    <v-btn>
      <v-icon>mdi-book</v-icon>

      <span>Book</span>
    </v-btn>

    <v-btn>
      <v-icon>mdi-image</v-icon>

      <span>Image</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref(1);
</script>
