<template>
  <div
    class="bg-white text-black fixed max-w-lg h-full w-full top-0 z-20 px-4 sm:px-6 overflow-y-scroll"
  >
    <header class="relative mb-2">
      <h1 class="text-base font-bold my-2">HOW TO USE</h1>
      <v-icon
        name="md-close"
        scale="1.2"
        class="absolute right-0 top-0 text-gray-500 cursor-pointer"
        @click="$emit('close')"
      />
    </header>

    <div class="text-left text-sm border-b border-gray-300 py-3">
      <p>
        1. Start a
        <a
          class="hyperlink"
          href="https://www.powerlanguage.co.uk/wordle/"
          target="_blank"
          >Wordle</a
        >
        puzzle
      </p>
      <p>2. Guess a word and get Wordle's feedback (green, yellow and gray)</p>
      <p>
        3. Fill your word in this helper and <b>click each tile</b> to change
        its state
      </p>
      <p>
        4. Then all possible words would be listed in the sidebar on the right →
      </p>
      <p>5. Select one word, go to 2</p>
    </div>

    <div class="text-left text-sm border-b border-gray-300 py-3">
      <p><b>Change tile state:</b></p>
      <li class="list-none py-2 flex items-center">
        <div class="tile w-10 h-10 mr-1.5 text-2xl">I</div>
        : initial
      </li>
      <li class="list-none py-2 flex items-center">
        <div class="tile absent border-none w-10 h-10 mr-1.5 text-2xl">A</div>
        : click once
      </li>
      <li class="list-none py-2 flex items-center">
        <div class="tile present border-none w-10 h-10 mr-1.5 text-2xl">P</div>
        : click twice
      </li>
      <li class="list-none py-2 flex items-center">
        <div class="tile correct border-none w-10 h-10 mr-1.5 text-2xl">C</div>
        : click three times
      </li>
    </div>

    <div class="text-left text-sm py-3">
      <p>
        Github repo:
        <a
          class="hyperlink"
          href="https://github.com/Renovamen/wordle-helper"
          target="_blank"
          >https://github.com/Renovamen/wordle-helper</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: "close"): void;
}>();
</script>
