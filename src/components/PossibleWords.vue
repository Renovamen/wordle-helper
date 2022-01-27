<template>
  <div
    :class="[
      'fixed right-0 top-0 h-full duration-200',
      !isOpen && 'translate-x-full'
    ]"
  >
    <div class="w-64 h-full bg-white border-l border-gray-300 overflow-scroll">
      <div
        class="text-lg font-medium py-2 border-b border-gray-300 w-56 mx-auto"
      >
        Possible Words
      </div>
      <div class="py-2 px-4">
        <div
          v-for="(word, index) in words"
          :key="index"
          class="leading-7 cursor-pointer hover:bg-gray-100 rounded-md"
          @click="$emit('choose', word)"
        >
          {{ word }}
        </div>
      </div>
    </div>

    <span
      class="absolute bg-white border-l border-t border-b border-gray-300 text-gray-400 w-6 h-12 top-1/2 -translate-y-1/2 right-64 flex items-center justify-center rounded-l cursor-pointer"
      @click="isOpen = !isOpen"
    >
      <v-icon v-if="!isOpen" name="bi-caret-left" />
      <v-icon v-if="isOpen" name="bi-caret-right" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  words: string[];
}>();

defineEmits<{
  (e: "choose", word: string): void;
}>();

const isOpen = ref(true);
</script>
