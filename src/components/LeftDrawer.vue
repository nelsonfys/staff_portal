<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    :rail-width="wider ? 80 : undefined"
    color="indigo"
    permanent
    @click="rail = false"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="John Leider"
      >
        <template v-slot:prepend>
          <v-avatar
            :class="{ 'mx-1': wider }"
            :size="wider && rail ? 40 : undefined"
          ></v-avatar>
        </template>
        <template v-slot:append>
          <v-btn
            :inert="rail"
            icon="mdi-chevron-left"
            variant="text"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="item.value"
        :class="{ 'pl-5': wider }"
        :prepend-icon="item.icon"
        :title="$t(item.title)"
        :value="item.value"
        :to="item.type === 'route' ? item.url : undefined"
        :href="item.type === 'external' ? item.url : undefined"
        :target="item.type === 'external' ? '_blank' : undefined"
      ></v-list-item>
    </v-list>

    <template #append>
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in logout_item"
          :title="$t(item.title)"
          :prepend-icon="item.icon"
          value="item.value"
        />
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(true);
const rail = ref(true);
const wider = ref(false);

const logout_item = [
  {
    icon: "mdi-logout-variant",
    title: "leftDrawerMenu.logout",
    value: "logout",
    route: "/",
  },
];

interface LeftDrawerMenu {
  icon: String;
  title: String;
  value: String;
  type: "route" | "external";
  url: string;
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
    icon: "mdi-information",
    title: "leftDrawerMenu.wiki",
    value: "wiki",
    type: "external",
    url: "https://www.pst.sg/staffwiki",
  },
  {
    icon: "mdi-email",
    title: "leftDrawerMenu.email",
    value: "email",
    type: "external",
    url: "https://outlook.cloud.microsoft/mail",
  },
  {
    icon: "mdi-account-multiple-outline",
    title: "leftDrawerMenu.support",
    value: "support",
    type: "external",
    url: "https://www.pst.sg/support/",
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
