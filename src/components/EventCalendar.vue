<template>
  <v-card elevation="2">
    <!-- ========================================= -->
    <!-- HEADER                                    -->
    <!-- ========================================= -->

    <v-toolbar color="transparent" class="px-4">
      <!-- Calendar title -->
      <v-toolbar-title class="text-h5 font-weight-bold">
        <v-icon class="mr-2"> mdi-calendar-month </v-icon>

        Calendar
      </v-toolbar-title>

      <v-spacer />

      <!-- Previous month -->
      <v-btn icon="mdi-chevron-left" variant="text" @click="previousMonth" />

      <!-- Date selector -->
      <v-menu v-model="dateMenu" :close-on-content-click="false">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="outlined"
            class="mx-2"
            prepend-icon="mdi-calendar"
          >
            {{ headerMonth }}
          </v-btn>
        </template>

        <v-card>
          <v-date-picker
            v-model="selectedDate"
            hide-header
            @update:model-value="dateMenu = false"
          />
        </v-card>
      </v-menu>

      <!-- Next month -->
      <v-btn icon="mdi-chevron-right" variant="text" @click="nextMonth" />

      <!-- Today -->
      <v-btn variant="outlined" class="ml-3" @click="goToday"> Today </v-btn>
    </v-toolbar>

    <v-divider />

    <!-- ========================================= -->
    <!-- CALENDAR                                  -->
    <!-- ========================================= -->

    <v-card-text class="pa-0">
      <v-calendar
        v-model="selectedDate"
        type="month"
        :events="calendarEvents"
        @click:date="onDateClick"
        @click:event="onEventClick"
      />
    </v-card-text>
  </v-card>

  <!-- ========================================= -->
  <!-- SELECTED DATE / EVENTS                    -->
  <!-- ========================================= -->

  <v-card v-if="selectedDate" class="mt-4" elevation="2">
    <v-card-title class="d-flex align-center">
      <v-icon class="mr-2"> mdi-calendar-check </v-icon>

      {{ formattedSelectedDate }}

      <v-spacer />

      <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
        Add Event
      </v-btn>
    </v-card-title>

    <v-divider />

    <!-- No events -->
    <v-card-text
      v-if="selectedDayEvents.length === 0"
      class="text-medium-emphasis"
    >
      <v-icon class="mr-2"> mdi-calendar-blank </v-icon>

      No events for this date.
    </v-card-text>

    <!-- Events -->
    <v-list v-else>
      <!-- <v-list-item
          v-for="event in selectedDayEvents"
          :key="event.id"
          class="py-3"
          @click="openEvent(event)"
        > -->
      <v-list-item
        v-for="event in selectedDayEvents"
        :key="event.id"
        class="py-3"
      >
        <template #prepend>
          <v-avatar color="primary" class="mr-4">
            <v-icon> mdi-calendar-clock </v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="font-weight-medium">
          {{ event.title }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ formatTime(event.startDate) }}

          -

          {{ formatTime(event.endDate) }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>

  <!-- ========================================= -->
  <!-- EVENT DIALOG                              -->
  <!-- ========================================= -->

  <v-dialog v-model="eventDialog" max-width="550">
    <v-card v-if="selectedEvent">
      <v-card-title class="d-flex align-center">
        <v-icon class="mr-2"> mdi-calendar-text </v-icon>

        {{ selectedEvent.title }}

        <v-spacer />

        <v-btn icon="mdi-close" variant="text" @click="eventDialog = false" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <div class="mb-4">
          <div class="text-caption text-medium-emphasis">Start</div>

          <div class="text-body-1">
            {{ formatDateTime(selectedEvent.startDate) }}
          </div>
        </div>

        <div class="mb-4">
          <div class="text-caption text-medium-emphasis">End</div>

          <div class="text-body-1">
            {{ formatDateTime(selectedEvent.endDate) }}
          </div>
        </div>

        <div>
          <div class="text-caption text-medium-emphasis">Description</div>

          <div class="text-body-1">
            {{ selectedEvent.description }}
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn variant="text" @click="eventDialog = false"> Close </v-btn>

        <v-btn color="primary" @click="editEvent"> Edit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ========================================= -->
  <!-- CREATE EVENT DIALOG                       -->
  <!-- ========================================= -->

  <v-dialog v-model="createDialog" max-width="550">
    <v-card>
      <v-card-title> Add Calendar Event </v-card-title>

      <v-divider />

      <v-card-text>
        <v-text-field
          v-model="newEvent.title"
          label="Event title"
          variant="outlined"
          class="mb-3"
        />

        <v-text-field
          v-model="newEvent.startDate"
          type="datetime-local"
          label="Start"
          variant="outlined"
          class="mb-3"
        />

        <v-text-field
          v-model="newEvent.endDate"
          type="datetime-local"
          label="End"
          variant="outlined"
          class="mb-3"
        />

        <v-textarea
          v-model="newEvent.description"
          label="Description"
          variant="outlined"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn variant="text" @click="createDialog = false"> Cancel </v-btn>

        <v-btn color="primary" :loading="saving" @click="createEvent">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

// =============================================
// Types
// =============================================

interface CalendarEvent {
  id: number;

  title: string;

  startDate: string;

  endDate: string;

  description: string;
}

// =============================================
// State
// =============================================

const selectedDate = ref(getToday());

const dateMenu = ref(false);

const events = ref<CalendarEvent[]>([]);

const loading = ref(false);

const saving = ref(false);

// Event dialog
const eventDialog = ref(false);

const selectedEvent = ref<CalendarEvent | null>(null);

// Create dialog
const createDialog = ref(false);

// New event
const newEvent = ref({
  title: "",

  startDate: "",

  endDate: "",

  description: "",
});

// =============================================
// Date helpers
// =============================================

function getToday(): string {
  const date = new Date();

  return formatDate(date);
}

function formatDate(date: Date): string {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// =============================================
// Header month
// =============================================

const headerMonth = computed(() => {
  const date = new Date(selectedDate.value + "T00:00:00");

  return date.toLocaleDateString("en-SG", {
    month: "long",
    year: "numeric",
  });
});

// =============================================
// Selected date text
// =============================================

const formattedSelectedDate = computed(() => {
  const date = new Date(selectedDate.value + "T00:00:00");

  return date.toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

// =============================================
// Calendar events
// =============================================

const calendarEvents = computed(() => {
  return events.value.map((event) => ({
    name: event.title,

    start: event.startDate,

    end: event.endDate,
  }));
});

// =============================================
// Selected day's events
// =============================================

const selectedDayEvents = computed(() => {
  return events.value.filter((event) => {
    return event.startDate.startsWith(selectedDate.value);
  });
});

// =============================================
// Load events
// =============================================

async function loadEvents() {
  loading.value = true;

  try {
    const date = new Date(selectedDate.value + "T00:00:00");

    // First day of month
    const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);

    // Last day of month
    const end = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const response = await fetch(
      `/api/calendar?start=${toLocalDateTime(start)}&end=${toLocalDateTime(
        end,
      )}`,
    );

    if (!response.ok) {
      throw new Error("Unable to load events");
    }

    events.value = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

// =============================================
// Date clicked
// =============================================

function onDateClick(data: any) {
  selectedDate.value = data.date;
}

// =============================================
// Event clicked
// =============================================

function onEventClick(data: any) {
  const title = data.event.name;

  selectedEvent.value =
    events.value.find((event) => event.title === title) || null;

  if (selectedEvent.value) {
    eventDialog.value = true;
  }
}

// =============================================
// Previous month
// =============================================

function previousMonth() {
  const date = new Date(selectedDate.value + "T00:00:00");

  date.setMonth(date.getMonth() - 1);

  selectedDate.value = formatDate(date);
}

// =============================================
// Next month
// =============================================

function nextMonth() {
  const date = new Date(selectedDate.value + "T00:00:00");

  date.setMonth(date.getMonth() + 1);

  selectedDate.value = formatDate(date);
}

// =============================================
// Today
// =============================================

function goToday() {
  selectedDate.value = getToday();
}

// =============================================
// Open create dialog
// =============================================

function openCreateDialog() {
  newEvent.value = {
    title: "",

    startDate: `${selectedDate.value}T09:00`,

    endDate: `${selectedDate.value}T10:00`,

    description: "",
  };

  createDialog.value = true;
}

// =============================================
// Create event
// =============================================

async function createEvent() {
  if (!newEvent.value.title) {
    return;
  }

  saving.value = true;

  try {
    const response = await fetch("/api/calendar", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newEvent.value),
    });

    if (!response.ok) {
      throw new Error("Unable to create event");
    }

    createDialog.value = false;

    await loadEvents();
  } catch (error) {
    console.error(error);
  } finally {
    saving.value = false;
  }
}

// =============================================
// Edit event
// =============================================

function editEvent() {
  console.log("Edit:", selectedEvent.value);

  // Add your edit dialog here
}

// =============================================
// Date/time formatting
// =============================================

function toLocalDateTime(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}`;
}

function formatTime(value: string): string {
  return new Date(value).toLocaleTimeString("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-SG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// =============================================
// Watch month/date changes
// =============================================

watch(selectedDate, () => {
  loadEvents();
});

// =============================================
// Initial load
// =============================================

onMounted(() => {
  loadEvents();
});
</script>
