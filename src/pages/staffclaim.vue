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
          <v-text-field
            clearable
            label="Amount"
            variant="outlined"
          ></v-text-field>
          <v-row
            ><v-checkbox color="primary" label="GST"></v-checkbox
            ><v-text-field
              clearable
              label="GST Amount"
              variant="outlined"
            ></v-text-field
          ></v-row>
          <v-text-field
            clearable
            label="Net Amount"
            variant="outlined"
          ></v-text-field>
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
            <span class="mr-3"> History </span>
          </v-row></v-card-title
        >
        <v-card-item>
          <v-table fixed-header>
            <thead>
              <tr>
                <th class="text-left">DocNo</th>
                <th class="text-left">Date</th>
                <th class="text-left">Status</th>
                <th class="text-left">View</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in claimList" :key="item.docNo">
                <td>{{ item.docNo }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.status }}</td>
                <td>
                  <v-btn size="small" variant="text" icon color="red">
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </td>
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
const selectedDate = ref(new Date());

const noOfDayList = ["14 days", "30 days", "90 days"];

const claimList = [
  {
    docNo: "1805",
    date: "2026-09-04",
    status: "Approved",
  },
  {
    docNo: "1790",
    date: "2026-09-03",
    status: "Approved",
  },
  {
    docNo: "1775",
    date: "2026-09-02",
    status: "Approved",
  },
  {
    docNo: "1774",
    date: "2026-09-01",
    status: "Rejected",
  },
  {
    docNo: "1767",
    date: "2026-08-31",
    status: "Rejected",
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
