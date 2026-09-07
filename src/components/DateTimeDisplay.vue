<template>
  <v-row align="center" justify="space-between" no-gutters>
    <!-- Greeting - Left -->
    <v-col cols="auto">
      <div class="text-responsive-title font-weight-medium">
        <v-icon>{{ greetingIcon }}</v-icon>
        <span>{{ greeting }}, Yoke Sin</span>
      </div>
    </v-col>

    <!-- Date & Time - Most Right -->
    <v-col cols="auto" class="text-right">
      <div class="clock-date">
        {{ currentDate }}
      </div>

      <div class="digital-time">
        {{ currentTime }}
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const currentTime = ref("");
const currentDate = ref("");
const greeting = ref("");
const greetingIcon = ref("");

let timer = null;

const updateClock = () => {
  const now = new Date();

  // Current time
  currentTime.value = now.toLocaleTimeString("en-SG", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Current date
  currentDate.value = now.toLocaleDateString("en-SG", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Greeting and icon
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    greeting.value = "Good Morning";
    greetingIcon.value = "mdi-weather-sunset-up";
  } else if (hour >= 12 && hour < 18) {
    greeting.value = "Good Afternoon";
    greetingIcon.value = "mdi-white-balance-sunny";
  } else if (hour >= 18 && hour < 22) {
    greeting.value = "Good Evening";
    greetingIcon.value = "mdi-weather-sunset-down";
  } else {
    greeting.value = "Good Night";
    greetingIcon.value = "mdi-weather-night";
  }
};

onMounted(() => {
  updateClock();

  timer = setInterval(updateClock, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
.digital-time {
  font-family: "Courier New", monospace;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 3px;
  line-height: 1.2;
}

.clock-date {
  font-size: 14px;
  opacity: 0.65;
}

@media (max-width: 600px) {
  .digital-time {
    font-size: 24px;
    letter-spacing: 2px;
  }

  .clock-date {
    font-size: 12px;
  }
}
</style>
