<template>
  <v-dialog v-model="dialog" max-width="400">
    <template #activator="{ props: activatorProps }">
      <v-text-field
        class="text-responsive-normal-text"
        v-bind="activatorProps"
        :model-value="formatDateYYYYMmDd(tempDate)"
        label="Select Date"
        prepend-inner-icon="mdi-calendar"
        variant="outlined"
        density="compact"
        readonly
        @click:clear="clearDate"
      />
    </template>

    <v-card>
      <v-date-picker
        v-model="tempDate"
        width="100%"
        @update:model-value="selectDate"
      />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { formatDateYYYYMmDd } from "../utils/dateUtil.ts"

interface Props {
  modelValue: Date | null;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  "update:modelValue": [value: Date | null];
}>();

const dialog = ref(false);

const tempDate = ref<Date | null>(
  props.modelValue ? new Date(props.modelValue) : null,
);

// Watch for changes from the parent
watch(
  () => props.modelValue,
  (value) => {
    tempDate.value = value ? new Date(value) : null;
  },
);

// Select date from date picker
function selectDate(value: Date | null) {
  if (!value) {
    return;
  }

  emit("update:modelValue", new Date(value));
  dialog.value = false;
}

// Clear selected date
function clearDate() {
  emit("update:modelValue", null);
}
</script>
