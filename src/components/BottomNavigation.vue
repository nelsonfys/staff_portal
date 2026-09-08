<template>
  <v-bottom-navigation v-model="selected" mode="shift" grow position="fixed">
    <v-btn
      v-for="item in items"
      :key="item.value"
      :value="item.value"
      @click="navigate(item)"
    >
      <v-icon>{{ item.icon }}</v-icon>

      <span>{{ $t(item.title) }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const selected = ref("dashboard");

function navigate(item: any) {
  if (item.type === "route" && item.url) {
    router.push(item.url);
  }
}

const items = [
  {
    icon: "mdi-newspaper",
    title: "leftDrawerMenu.dashBoard",
    value: "dashboard",
    type: "route",
    url: "/dashboard",
  },
  {
    icon: "mdi-account-edit",
    title: "leftDrawerMenu.status",
    value: "status",
    type: "route",
    url: "/staffstatus",
  },
  {
    icon: "mdi-folder-move",
    title: "leftDrawerMenu.leave",
    value: "leave",
    type: "route",
    url: "/staffleave",
  },
  {
    icon: "mdi-file-document",
    title: "leftDrawerMenu.claim",
    value: "claim",
    type: "route",
    url: "/staffclaim",
  },
  {
    icon: "mdi-lock",
    title: "leftDrawerMenu.password",
    value: "password",
    type: "route",
    url: "/changepassword",
  },
];
</script>
