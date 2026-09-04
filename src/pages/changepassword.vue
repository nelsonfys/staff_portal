<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" width="450" elevation="2">
      <v-card-title align="center">{{
        $t("changePassword.title")
      }}</v-card-title>
      <v-text-field
        :label="$t('changePassword.oldPassword')"
        outlined
        dense
        type="password"
      ></v-text-field>
      <v-text-field
        :label="$t('changePassword.newPassword')"
        outlined
        dense
        type="password"
      ></v-text-field>
      <v-text-field
        :label="$t('changePassword.confirmPassword')"
        outlined
        dense
        type="password"
      ></v-text-field>
      <div class="d-flex ga-4">
        <v-btn
          class="mt-4 flex-grow-1"
          color="primary"
          @click="goToDashboard"
          >{{ $t("changePassword.submit") }}</v-btn
        >
        <v-btn
          class="mt-4 flex-grow-1"
          color="primary"
          @click="goToDashboard"
          >{{ $t("changePassword.reset") }}</v-btn
        >
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToDashboard = () => {
  router.push({ name: "Dashboard" });
};
</script>
