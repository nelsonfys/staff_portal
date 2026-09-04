<template>
  <v-row>
    <v-col cols="6">
      <v-card class="pa-6" elevation="2">
        <v-card-title>Leave Application Form</v-card-title>
        <v-card-item>
          <v-select
            label="Nature of Leave"
            v-model="leave"
            :items="leaveList"
            variant="outlined"
            density="compact"
            hide-details
            class="pt-3 pb-5"
          />
          <v-row>
            <v-text-field
              v-model="leave_entitled"
              label="Leave Entitled"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="leave_taken"
              label="Leave Taken"
              readonly
            ></v-text-field>
          </v-row>
          <div class="pt-3 pb-5">
            <v-btn block color="primary">Select Date</v-btn>
          </div>
          <v-row align="center">
            <v-select
              label="Period"
              v-model="period"
              :items="periodList"
              variant="outlined"
              density="compact"
              hide-details
              class="pt-3 pb-5"
            />
            <v-btn color="primary">Add</v-btn>
          </v-row>
          <v-textarea label="Others" variant="outlined"></v-textarea>
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

    <v-col cols="6">
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

const noOfDays = ref("14 days");

const leave = ref("Annual Leave");
const customer = ref(null);
const leave_entitled = ref("18");
const leave_taken = ref("6");
const period = ref("FULL");

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

const leaveList = [
  "Annual Leave",
  "Compassionate Leave",
  "Hospitalization Leave",
  "Sick Leave",
  "Unpaid Leave",
];

const periodList = ["FULL", "AM", "PM"];
</script>
