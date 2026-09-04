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
        :title="item.title"
        :value="item.value"
      ></v-list-item>
    </v-list>

    <template #append>
      <v-list density="compact" nav>
        <v-list-item
          title="Logout"
          prepend-icon="mdi-logout-variant"
          value="logout"
          @click="logout"
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
const items = [
  { icon: "mdi-account-edit", title: "Status Update", value: "A" },
  { icon: "mdi-account-box", title: "Staff Status", value: "B" },
  { icon: "mdi-file-document", title: "Claim", value: "C" },
  { icon: "mdi-folder-move", title: "Leave", value: "D" },
  { icon: "mdi-account-multiple-outline", title: "Support", value: "E" },
  { icon: "mdi-information", title: "Wiki", value: "F" },
  { icon: "mdi-email", title: "Email", value: "G" },
];
</script>
