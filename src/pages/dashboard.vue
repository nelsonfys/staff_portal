<template>
  <v-row style="min-width: 300px">
    <date-time />
  </v-row>
  <v-row style="min-width: 300px">
    <v-col cols="12" lg="6" class="d-flex flex-column ga-5">
      <v-card>
        <v-card-title class="text-responsive-title">{{
          $t("dashboard.titleSS")
        }}</v-card-title>
        <v-card-item>
          <v-table fixed-header class="text-responsive-table">
            <thead>
              <tr>
                <th class="text-left">Name of Staff</th>
                <th class="text-left">Company</th>
                <th class="text-left">Status/Location</th>
                <th class="text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in staffList" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.company }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-item>
      </v-card>

      <v-card>
        <v-card-title class="text-responsive-title">{{
          $t("dashboard.titleLM")
        }}</v-card-title>
        <v-card-item>
          <v-table fixed-header class="text-responsive-table">
            <thead>
              <tr>
                <th class="text-left">Name of Staff</th>
                <th class="text-left">Company</th>
                <th class="text-left">Status/Location</th>
                <th class="text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in staffList2" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.company }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.time }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-item>
      </v-card>

      <v-card>
        <v-card-title class="text-responsive-title">{{
          $t("dashboard.titleUL")
        }}</v-card-title>
        <v-card-item>
          <v-table fixed-header class="text-responsive-table">
            <thead>
              <tr>
                <th class="text-left">Name of Staff</th>
                <th class="text-left">Date/Period</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in staffList3" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.datePer }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-item>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <event-calendar />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import EventCalendar from "@/components/EventCalendar.vue";
import DateTime from "@/components/DateTimeDisplay.vue";
import { useAuthStore } from "@/stores/auth";

const staffList = [
  {
    name: "Wan, Joe Yee",
    company: "PST",
    status: "Work @ Office",
    time: "07:57 AM",
  },
  {
    name: "Sim, Shau Yih",
    company: "PST",
    status: "Work @ Office",
    time: "08:16 AM",
  },
  {
    name: "Foo, Yoke Sin",
    company: "PST",
    status: "Work @ Office",
    time: "09:41 AM",
  },
  {
    name: "Remedios, Elvin",
    company: "PST",
    status: "Work @ Office",
    time: "10:04 AM",
  },
  {
    name: "Baccay, Renedick",
    company: "PST",
    status: "Work @ Office",
    time: "10:13 AM",
  },
];

const staffList2 = [
  {
    name: "Boh, Chai Yeh",
    company: "PST",
    status: "Medical Appointment",
    time: "08:32 AM",
  },
];

const staffList3 = [
  {
    name: "Si, Ignatius",
    datePer: "2026-09-08 FULL",
  },
  {
    name: "Loh, Boon Kee",
    datePer: "2026-09-22 FULL",
  },
  {
    name: "Loh, Boon Kee",
    datePer: "2026-09-23 FULL",
  },
];
</script>
