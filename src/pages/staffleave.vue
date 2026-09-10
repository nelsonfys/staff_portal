<template>
  <v-row>
    <v-col cols="12" lg="6">
      <v-card class="pa-6" elevation="2">
        <v-card-title class="text-responsive-title">{{
          $t("staffLeave.title")
        }}</v-card-title>

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
            <div class="my-6 pa-6">
              <div class="d-flex align-center justify-space-between">
                <span>Total Leave Entitled {{ total }} days</span>
                <v-spacer />
                <v-select
                  v-model="selectedGroup"
                  :items="[
                    'Annual Leave',
                    'Compassionate Leave',
                    'Hospitalization Leave',
                    'Sick Leave',
                    'Unpaid Leave',
                  ]"
                  density="compact"
                  max-width="200"
                  variant="solo-filled"
                  flat
                  hide-details
                  single-line
                ></v-select>
              </div>

              <v-pie
                :key="selectedGroup"
                :items="currentItems"
                :legend="{
                  position: $vuetify.display.mdAndUp ? 'right' : 'bottom',
                }"
                :tooltip="{ subtitleFormat: '[value]' }"
                class="pa-3 mt-3 justify-center"
                gap="2"
                inner-cut="70"
                item-key="id"
                rounded="2"
                size="300"
                animation
                hide-slice
                reveal
              >
                <template v-slot:center>
                  <div class="text-center">
                    <div class="text-display-medium">{{ balance }}</div>
                    <div class="opacity-70 mt-1 mb-n1">balance</div>
                  </div>
                </template>

                <template v-slot:legend="{ items, toggle, isActive }">
                  <v-list
                    class="py-0 mb-n5 mb-md-0 bg-transparent"
                    density="compact"
                    width="300"
                  >
                    <v-list-item
                      v-for="item in items"
                      :key="item.key"
                      :class="['my-1', { 'opacity-40': !isActive(item) }]"
                      :title="item.title"
                      rounded="lg"
                      link
                      @click="toggle(item)"
                      s
                    >
                      <template v-slot:prepend>
                        <v-avatar :color="item.color" :size="16"></v-avatar>
                      </template>
                      <template v-slot:append>
                        <div class="font-weight-bold">{{ item.value }}</div>
                      </template>
                    </v-list-item>
                  </v-list>
                </template>
              </v-pie>
            </div>

            <div class="h-0">
              <svg
                height="0"
                version="1.1"
                width="0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="pattern-0"
                    height="20"
                    patternTransform="rotate(145) scale(.2)"
                    patternUnits="userSpaceOnUse"
                    width="20"
                  >
                    <path
                      d="M0 10h20zm0 20h20zm0 20h20zm0 20h20z"
                      fill="none"
                      stroke="rgb(var(--v-theme-surface))"
                      stroke-width="3"
                    />
                  </pattern>
                </defs>
              </svg>
            </div>
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
import { ref, shallowRef, toRef, computed } from "vue";
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

const selectedGroup = shallowRef("Annual Leave");

const currentItems = toRef(() => {
  if (selectedGroup.value === "Annual Leave") {
    return [
      { id: 1, title: "Entitled", value: 14, color: "#349CD9" },
      { id: 2, title: "Adjustment", value: 1, color: "#34D9CF" },
      { id: 3, title: "B/F", value: 6.5, color: "#9CE094" },
      { id: 4, title: "Taken", value: 10, color: "#DB1D26" },
    ];
  } else if (selectedGroup.value === "Compassionate Leave") {
    return [
      { id: 1, title: "Entitled", value: 3, color: "#349CD9" },
      { id: 2, title: "Adjustment", value: 0, color: "#34D9CF" },
      { id: 3, title: "B/F", value: 0, color: "#9CE094" },
      { id: 4, title: "Taken", value: 0, color: "#DB1D26" },
    ];
  } else if (selectedGroup.value === "Hospitalization Leave") {
    return [
      { id: 1, title: "Entitled", value: 60, color: "#349CD9" },
      { id: 2, title: "Adjustment", value: 0, color: "#34D9CF" },
      { id: 3, title: "B/F", value: 0, color: "#9CE094" },
      { id: 4, title: "Taken", value: 0, color: "#DB1D26" },
    ];
  } else if (selectedGroup.value === "Sick Leave") {
    return [
      { id: 1, title: "Entitled", value: 14, color: "#349CD9" },
      { id: 2, title: "Adjustment", value: 0, color: "#34D9CF" },
      { id: 3, title: "B/F", value: 0, color: "#9CE094" },
      { id: 4, title: "Taken", value: 5, color: "#DB1D26" },
    ];
  } else if (selectedGroup.value === "Unpaid Leave") {
    return [
      { id: 1, title: "Entitled", value: 14, color: "#349CD9" },
      { id: 2, title: "Adjustment", value: 0, color: "#34D9CF" },
      { id: 3, title: "B/F", value: 0, color: "#9CE094" },
      { id: 4, title: "Taken", value: 1, color: "#DB1D26" },
    ];
  }
  return [];
});

const balance = computed(() => {
  let taken = currentItems.value[3].value;
  let total = currentItems.value
    .filter((v) => v.id != 4)
    .reduce((sum, item) => sum + item.value, 0);
  return total - taken;
});

const total = computed(() =>
  currentItems.value
    .filter((v) => v.id != 4)
    .reduce((sum, item) => sum + item.value, 0),
);

const staffList = [
  {
    ref: "7385",
    nol: "Annual Leave",
    datePer: "2026-09-04 FULL",
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
