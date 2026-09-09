<template>
  <v-app-bar color="primary" dark prominent elevation="2">
    <v-app-bar-title v-if="mobile"
      >{{ companyinfo.companyName }} Staff Portal</v-app-bar-title
    >
    <v-spacer />
    <v-btn class="text-none" stacked size="small" @click="toggleTheme">
      <v-icon>
        {{
          theme.global.name.value === "light"
            ? "mdi-weather-night"
            : "mdi-white-balance-sunny"
        }}
      </v-icon>
    </v-btn>

    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" class="text-none" stacked size="small">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
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
    <div v-if="authStore.isLoggedIn">
      <v-btn class="text-none" stacked size="small">
        <v-badge color="error" content="2">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
      <v-btn class="text-none" stacked size="small">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import companyinfo from "@/constants/companyinfo";
import { useDisplay, useTheme } from "vuetify";
import { useAuthStore } from "@/stores/auth";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const { mobile } = useDisplay();
const theme = useTheme();
const authStore = useAuthStore();

function toggleTheme() {
  theme.change(theme.global.name.value === "light" ? "dark" : "light");
}

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
