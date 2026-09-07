<template>
  <v-row style="min-width: 300px">
    <v-col cols="12" lg="6">
      <v-card class="pa-6" elevation="2">
        <v-card-title>Claim Form</v-card-title>
        <v-card-item>
          <v-row class="pt-2 pb-3">
            <v-col cols="12" lg="6">
              <date-picker-dialog
                v-model="selectedDate"
                label="Date of Leave"
              />
            </v-col>

            <v-col cols="12" lg="6">
              <v-select
                label="Claim Type"
                v-model="claimType"
                :items="claimTypeList"
                variant="outlined"
                density="compact"
                hide-details
              />
            </v-col>
          </v-row>
          <v-textarea label="Details" variant="outlined"></v-textarea>
          <v-card>
            <v-card-title>Details</v-card-title>
            <v-card-item>
              <v-table fixed-header>
                <thead>
                  <tr>
                    <th class="text-left">Staff</th>
                    <th class="text-left">Date</th>
                    <th class="text-left">Time</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in staffList" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.time }}</td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-item>
          </v-card>
          <div class="d-flex ga-4">
            <v-btn class="mt-4 flex-grow-1" color="primary">{{
              $t("changePassword.submit")
            }}</v-btn>
            <v-btn class="mt-4 flex-grow-1" color="primary">{{
              $t("changePassword.reset")
            }}</v-btn>
          </div>
        </v-card-item>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <v-card>
        <v-card-title
          ><v-row class="align-center" no-gutters>
            <span class="mr-3"> Status for the Past: </span>

            <v-select
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
                <th class="text-left">Staff</th>
                <th class="text-left">Date</th>
                <th class="text-left">Time</th>
                <th class="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in staffList" :key="item.name">
                <td>{{ item.name }}</td>
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
import DatePickerDialog from "@/components/DatePickerDialog.vue";

const noOfDays = ref("14 days");
const claimType = ref("Dental");
const customer = ref(null);
const leave_entitled = ref("18");
const leave_taken = ref("6");
const period = ref("FULL");
const selectedDate = ref<string | null>(null);

const noOfDayList = ["14 days", "30 days", "90 days"];

const staffList = [
  {
    name: "Foo, Yoke Sin",
    date: "2026-09-04",
    time: "09:41 AM",
    status: "Work @ Office",
  },
  {
    name: "Foo, Yoke Sin",
    date: "2026-09-03",
    time: "09:35 AM",
    status: "Work @ Office",
  },
  {
    name: "Foo, Yoke Sin",
    date: "2026-09-02",
    time: "09:50 AM",
    status: "Work @ Office",
  },
  {
    name: "Foo, Yoke Sin",
    date: "2026-09-01",
    time: "09:25 AM",
    status: "Work @ Office",
  },
  {
    name: "Foo, Yoke Sin",
    date: "2026-08-31",
    time: "09:41 AM",
    status: "Work @ Office",
  },
];

const claimTypeList = [
  "Dental",
  "Entertainment",
  "General",
  "Maintenance",
  "Medical",
  "Postage & Courier",
  "Stationery",
  "Supplies",
  "Telephone",
  "Transport",
  "Travel",
  "Utilities",
  "Welfare",
];

const periodList = ["FULL", "AM", "PM"];
</script>
