<template>
  <v-row style="min-width: 300px">
    <v-col cols="12" lg="6">
      <v-card class="pa-6" elevation="2">
        <v-card-title class="text-responsive-title">{{
          $t("staffStatus.title")
        }}</v-card-title>
        <v-card-item>
          <v-row class="pt-2 pb-3">
            <v-col cols="12" lg="6">
              <v-select
                class="text-responsive-normal-text"
                label="Status"
                v-model="workStatus"
                :items="workStatusList"
                variant="outlined"
                density="compact"
                hide-details
              />
            </v-col>

            <v-col cols="12" lg="6">
              <v-select
                class="text-responsive-normal-text"
                label="Customer"
                v-model="customer"
                :items="customerList"
                variant="outlined"
                density="compact"
                placeholder="If at customer site, please select ..."
              />
            </v-col>
          </v-row>
          <v-textarea
            class="text-responsive-normal-text"
            label="Others"
            variant="outlined"
          ></v-textarea>
          <div class="d-flex ga-4">
            <v-btn
              prepend-icon="mdi-check-circle-outline"
              class="mt-4 flex-grow-1 text-responsive-button"
              color="primary"
              >{{ $t("changePassword.submit") }}</v-btn
            >
            <v-btn
              prepend-icon="mdi-refresh"
              class="mt-4 flex-grow-1"
              color="primary"
              >{{ $t("changePassword.reset") }}</v-btn
            >
          </div>
        </v-card-item>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <v-card>
        <v-card-title
          ><v-row class="align-center" no-gutters>
            <span class="mr-3 text-responsive-title">
              Status for the Past:
            </span>

            <v-select
              class="text-responsive-normal-text"
              v-model="noOfDays"
              :items="noOfDayList"
              variant="outlined"
              density="compact"
              hide-details
              style="max-width: 150px"
            /> </v-row
        ></v-card-title>
        <v-card-item>
          <v-table fixed-header>
            <thead>
              <tr>
                <th class="text-left">Date</th>
                <th class="text-left">Time</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in staffList" :key="item.status">
                <td>{{ item.date }}</td>
                <td>{{ item.time }}</td>
                <td>{{ item.status }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";

const noOfDays = ref("14 days");

const workStatus = ref("Work @ Office");
const customer = ref(null);

const noOfDayList = ["14 days", "30 days", "90 days"];

const staffList = [
  {
    date: "2026-09-04",
    time: "09:41 AM",
    status: "Work @ Office",
  },
  {
    date: "2026-09-03",
    time: "09:35 AM",
    status: "Work @ Office",
  },
  {
    date: "2026-09-02",
    time: "09:50 AM",
    status: "Work @ Office",
  },
  {
    date: "2026-09-01",
    time: "09:25 AM",
    status: "Work @ Office",
  },
  {
    date: "2026-08-31",
    time: "09:41 AM",
    status: "Work @ Office",
  },
];

const workStatusList = [
  "Work @ Office",
  "Work @ Home",
  "Customer Site",
  "On Urgent Leave",
  "On Sick Leave",
  "- Others -",
  "On Cloud9",
  "On NS",
  "See doctor",
  "Will be late",
];

const customerList = [
  "AXA Affin General Insurance",
  "ECICS",
  "EQ Insurance",
  "ERGO Insurance",
  "India International Insurance",
  "Insurefin",
  "Progressive Insurance",
  "PSWT",
  "Tokio Marine Insurance",
  "United Overseas Insurance",
];
</script>
