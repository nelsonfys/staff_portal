<template>
  <v-container
    class="fill-height d-flex flex-column justify-center"
    max-width="450"
  >
    <div>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-6" outlined>
            <v-card-title class="text-h5" align="center">{{
              $t("login.title")
            }}</v-card-title>
            <v-text-field
              v-model="username"
              :label="$t('login.username')"
              outlined
              dense
            ></v-text-field>
            <v-text-field
              v-model="password"
              :label="$t('login.password')"
              outlined
              dense
              type="password"
            ></v-text-field>
            <div class="d-flex align-center justify-space-between">
              <v-checkbox
                :label="$t('login.rememberMe')"
                density="compact"
                hide-details
                class="ma-0"
              />

              <a href="#" class="text-decoration-none">{{
                $t("login.forgotPassword")
              }}</a>
            </div>
            <v-btn class="mt-4" color="primary" block @click="login">{{
              $t("login.login")
            }}</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const username = ref("");
const password = ref("");

function login() {
  const token = "abc123";
  authStore.login(username.value, token);
  router.push({ name: "Dashboard" });
}
</script>
