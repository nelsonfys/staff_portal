<template>
  <v-app-bar color="indigo" dark prominent>
    <v-app-bar-title>{{ companyinfo.companyName }}</v-app-bar-title>
    <v-spacer />
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" icon="mdi-translate" variant="text" />
      </template>

      <v-list density="compact">
        <v-list-item
          v-for="language in languages"
          :key="language.value"
          :title="language.title"
          @click="locale = language.value"
        />
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import companyinfo from "@/constants/companyinfo";

const { locale } = useI18n();

const languages = [
  {
    title: "English",
    value: "en",
  },
  {
    title: "中文",
    value: "zh",
  },
];
</script>
