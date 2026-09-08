<template>
  <v-row>
    <v-col cols="12" lg="6">
      <v-card class="pa-6" elevation="2">
        <v-card-title class="text-responsive-title">{{
          $t("staffLeave.title")
        }}</v-card-title>
        <v-row>
          <v-col cols="12" lg="6" class="pb-3">
            <v-text-field
              class="text-responsive-normal-text"
              v-model="leave_entitled"
              label="Leave Entitled"
              density="compact"
              readonly
              hide-details
            />
          </v-col>

          <v-col cols="12" lg="6" class="pb-3">
            <v-text-field
              class="text-responsive-normal-text"
              v-model="leave_taken"
              label="Leave Taken"
              density="compact"
              readonly
              hide-details
            />
          </v-col>
        </v-row>

        <v-select
          label="Nature of Leave"
          v-model="leave"
          item-title="label"
          item-value="value"
          :items="leaveList"
          variant="outlined"
          density="compact"
          hide-details
          class="pt-3 pb-5 text-responsive-normal-text"
        />

        <v-row>
          <v-col cols="12" lg="5">
            <date-picker-dialog v-model="selectedDate" label="Date of Leave" />
          </v-col>

          <v-col cols="12" lg="4">
            <v-select
              class="text-responsive-normal-text"
              label="Period"
              v-model="period"
              :items="periodList"
              variant="outlined"
              density="compact"
              hide-details
            />
          </v-col>

          <v-col cols="12" lg="3">
            <v-btn
              class="text-responsive-button"
              block
              color="primary"
              prepend-icon="mdi-plus"
              @click="addLeaveRecord"
            >
              Add
            </v-btn>
          </v-col>
        </v-row>
        <v-divider class="my-5" />
        <v-card>
          <v-card-title class="text-responsive-title"
            >Added Leave Records, total 2.5 days</v-card-title
          >
          <v-card-item>
            <div v-if="addedLeaveRecords.length > 0">
              <v-table fixed-header class="text-responsive-table">
                <thead>
                  <tr>
                    <th class="text-left">Nature of Leave</th>
                    <th class="text-left">Date</th>
                    <th class="text-left">Period</th>
                    <th class="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in addedLeaveRecords" :key="item.value">
                    <td>{{ leaveLabelMap[item.value] ?? item.value }}</td>
                    <td>{{ formatDateYYYYMmDd(item.selectedDate) }}</td>
                    <td>{{ item.period }}</td>
                    <td>
                      <v-btn
                        size="small"
                        variant="text"
                        icon
                        color="red"
                        @click="removeLeaveRecord(item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </div>
            <div v-else>No records</div>
          </v-card-item>
        </v-card>
        <div class="d-flex ga-4 mt-4">
          <v-btn
            prepend-icon="mdi-check-circle-outline"
            class="text-responsive-button flex-grow-1"
            color="primary"
            >{{ $t("changePassword.submit") }}</v-btn
          >
          <v-btn
            prepend-icon="mdi-refresh"
            class="text-responsive-button flex-grow-1"
            color="primary"
            >{{ $t("changePassword.reset") }}</v-btn
          >
        </div>
      </v-card>
    </v-col>

    <v-col cols="12" lg="6">
      <v-card elevation="2">
        <v-tabs v-model="tab" color="primary">
          <v-tab value="one">Leave Details</v-tab>
          <v-tab value="two">Approved Leave</v-tab>
          <v-tab value="three">Cancelled Leave</v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <v-card class="pa-3">
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

              <v-table fixed-header class="text-responsive-table">
                <thead>
                  <tr>
                    <th class="text-left">Ref.</th>
                    <th class="text-left">Nature of Leave</th>
                    <th class="text-left">Date/Period</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in staffList" :key="item.ref">
                    <td>{{ item.ref }}</td>
                    <td>{{ item.nol }}</td>
                    <td>{{ item.datePer }}</td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-tabs-window-item>
          <v-tabs-window-item value="two">
            <v-card class="pa-3">
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

              <v-table fixed-header class="text-responsive-table">
                <thead>
                  <tr>
                    <th class="text-left">Ref.</th>
                    <th class="text-left">Nature of Leave</th>
                    <th class="text-left">Date/Period</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in staffList" :key="item.ref">
                    <td>{{ item.ref }}</td>
                    <td>{{ item.nol }}</td>
                    <td>{{ item.datePer }}</td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-tabs-window-item>

          <v-tabs-window-item value="three">
            <v-card class="pa-3">
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

              <v-table fixed-header class="text-responsive-table">
                <thead>
                  <tr>
                    <th class="text-left">Ref.</th>
                    <th class="text-left">Nature of Leave</th>
                    <th class="text-left">Date/Period</th>
                    <th class="text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in staffList" :key="item.ref">
                    <td>{{ item.ref }}</td>
                    <td>{{ item.nol }}</td>
                    <td>{{ item.datePer }}</td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import DatePickerDialog from "@/components/DatePickerDialog.vue";
import { formatDateYYYYMmDd } from "@/utils/dateUtil.ts";
import { leaveList } from "@/constants/listing";

const noOfDays = ref("14 days");
const leave = ref("Annual Leave");
const leave_entitled = ref("18");
const leave_taken = ref("6");
const period = ref("FULL");
const selectedDate = ref(new Date());

const noOfDayList = ["14 days", "30 days", "90 days"];

interface LeaveRecord {
  value: string;
  selectedDate: Date | null;
  period: string;
}

const tab = ref("one");

const addedLeaveRecords = ref<LeaveRecord[]>([]);

function addLeaveRecord() {
  if (selectedDate.value && leave.value && period.value) {
    const newRecord = {
      value: leave.value,
      selectedDate: selectedDate.value,
      period: period.value,
    };
    addedLeaveRecords.value.push(newRecord);
  }
}

function removeLeaveRecord(item: LeaveRecord) {
  const index = addedLeaveRecords.value.indexOf(item);

  if (index !== -1) {
    addedLeaveRecords.value.splice(index, 1);
  }
}

const leaveLabelMap: Record<string, string> = Object.fromEntries(
  leaveList.map((item) => [item.value, item.label]),
);

const staffList = [
  {
    ref: "7385",
    nol: "Annual Leave",
    datePer: "2026-09-04 FULL",
    time: "09:41 AM",
    status: "Approved",
  },
  {
    ref: "7385",
    nol: "Annual Leave",
    datePer: "2026-09-03 FULL",
    status: "Approved",
  },
  {
    ref: "7386",
    nol: "Annual Leave",
    datePer: "2026-09-02 AM",
    status: "Approved",
  },
  {
    ref: "7386",
    nol: "Annual Leave",
    datePer: "2026-09-01 AM",
    status: "Approved",
  },
  {
    ref: "7387",
    nol: "Sick Leave",
    datePer: "2026-08-31 FULL",
    status: "Approved",
  },
];

const periodList = ["FULL", "AM", "PM"];
</script>
