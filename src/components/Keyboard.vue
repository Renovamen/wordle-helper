<template>
  <div class="keyboard mt-4 mx-2 select-none">
    <div
      class="flex w-full touch-manipulation mx-auto mb-2"
      v-for="(row, i) in rows"
      :key="`row-${i}`"
    >
      <div class="spacer" v-if="i === 1"></div>
      <button
        v-for="key in row"
        :key="key"
        class="font-bold mr-1.5 h-14 rounded cursor-pointer select-none bg-gray-300 text-black text-sm flex-1 flex justify-center items-center uppercase duration-500"
        :class="[key.length > 1 && 'big', letterStates[key]]"
        @click="$emit('key', key)"
      >
        <span v-if="key !== 'Backspace'">{{ key }}</span>
        <v-icon v-else name="md-backspace-outlined" scale="1.2" />
      </button>
      <div class="spacer" v-if="i === 1"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LetterState } from '../types'

defineProps<{
  letterStates: Record<string, LetterState>
}>()

defineEmits<{
  (e: 'key', key: string): void
}>()

const rows = [
  'qwertyuiop'.split(''),
  'asdfghjkl'.split(''),
  ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
]
</script>
