<template>
  <Transition>
    <div
      v-if="message"
      class="absolute text-white bg-black/75 left-1/2 top-20 z-10 rounded font-semibold py-3 px-5 -translate-x-1/2 duration-300"
    >
      {{ message }}
      <pre v-if="grid">{{ grid }}</pre>
    </div>
  </Transition>

  <header class="relative border-b border-gray-300 mb-4">
    <h1 class="text-2xl sm:text-3xl font-bold my-2">
      WORDLE HELPER
    </h1>

    <div class="absolute top-1.5 right-4 text-gray-400">
      <v-icon
        name="md-refresh"
        scale="1.2"
        class="mr-1 cursor-pointer"
        @click="clearAllTiles"
      />

      <a
        class=""
        href="https://github.com/Renovamen/wordle-helper"
        target="_blank"
      >
        <v-icon name="ri-github-line" scale="1.2" />
      </a>
    </div>
  </header>

  <div
    id="board"
    class="grid grid-rows-6 gap-1 box-border my-0 mx-auto"
  >
    <div
      v-for="(row, index) in board"
      :key="`${row}-${index}`"
      :class="[
        'grid grid-cols-5 gap-1',
        shakeRowIndex === index && 'shake',
        success && currentRowIndex === index && 'jump'
      ]"
    >
      <div
        v-for="(tile, index) in row"
        :key="`${tile}-${index}`"
        :class="[
          'tile relative w-full text-3xl font-medium align-middle uppercase select-none box-border inline-flex justify-center items-center duration-300 border-2 border-gray-300',
          tile.letter && 'border-gray-500 zoom',
          tile.state && 'border-none',
          tile.state
        ]"
        @click="changeTileState(tile)"
      >
        {{ tile.letter }}
      </div>
    </div>
  </div>

  <Keyboard @key="onKey" :letter-states="letterStates" />

  <PossibleWords @choose="chossPossibleWord" :words="possibleWords" />
</template>

<script setup lang="ts">
import { onUnmounted, ref, computed } from 'vue'
import { allWords, guessPossibleWords } from './utils'
import Keyboard from './components/Keyboard.vue'
import PossibleWords from './components/PossibleWords.vue'
import { LetterState, TileType } from './types'

// Board state. Each tile is represented as { letter, state }
const board = ref<Array<Array<TileType>>>(
  Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      letter: '',
      state: LetterState.INITIAL
    }))
  )
)

// Current active row.
const currentRowIndex = ref(0)
const currentRow = computed(() => board.value[currentRowIndex.value])

// Feedback state: message and shake
const message = ref('')
const grid = ref('')
const shakeRowIndex = ref(-1)
const success = ref(false)

const possibleWords = ref<string[]>([]);

// Keep track of revealed letters for the virtual keyboard
const letterStates = ref<Record<string, LetterState>>({})

const onKeyup = (e: KeyboardEvent) => onKey(e.key)

window.addEventListener('keyup', onKeyup)

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup)
})

const onKey = (key: string) => {
  if (/^[a-zA-Z]$/.test(key)) {
    fillTile(key.toLowerCase())
  } else if (key === 'Backspace') {
    clearTile()
  } else if (key === 'Enter') {
    guessWords()
  }
}

const fillTile = (letter: string) => {
  for (const tile of currentRow.value) {
    if (!tile.letter) {
      tile.letter = letter
      break
    }
  }
}

const clearTile = () => {
  for (const tile of [...currentRow.value].reverse()) {
    if (tile.letter) {
      tile.letter = ''
      tile.state = 0
      break
    }
  }
}

const clearAllTiles = () => {
  board.value.forEach((row) => {
    row.forEach((tile) => {
      tile.letter = ''
      tile.state = 0
    })
  })
  currentRowIndex.value = 0;
  possibleWords.value = [];
  letterStates.value = {};
}

const tileStateList = [
  LetterState.ABSENT,
  LetterState.PRESENT,
  LetterState.CORRECT
]

const changeTileState = (tile: TileType) => {
  if (tile.letter === '') return;  // can't set state before setting letter
  const currentIndex = tile.state ? tileStateList.indexOf(tile.state) : -1;
  const nextIndex = (currentIndex + 1) % tileStateList.length;
  tile.state = tileStateList[nextIndex];
}

const guessWords = () => {
  if (!currentRow.value.every((tile) => tile.letter !== '')) {
    shake()
    showMessage('Not enough letters')
    return;
  }

  const guess = currentRow.value.map((tile) => tile.letter).join('')

  if (!allWords.includes(guess)) {
    shake()
    showMessage('Not in word list')
    return
  }

  if (!currentRow.value.every((tile) => tile.state)) {
    shake()
    showMessage('Not enough states')
    return;
  }

  currentRow.value.forEach((tile) => {
    letterStates.value[tile.letter] = tile.state;
  })

  possibleWords.value = guessPossibleWords(allWords, board.value.slice(0, currentRowIndex.value + 1));

  // go the next row
  currentRowIndex.value++
}

const chossPossibleWord = (word: string) => {
  const letters: string[] = word.split('');
  for (const i in letters) {
    currentRow.value[i].letter = letters[i];
  }
}

const showMessage = (msg: string, time = 1000) => {
  message.value = msg
  if (time > 0) {
    setTimeout(() => {
      message.value = ''
    }, time)
  }
}

const shake = () => {
  shakeRowIndex.value = currentRowIndex.value
  setTimeout(() => {
    shakeRowIndex.value = -1
  }, 1000)
}

const icons = {
  [LetterState.CORRECT]: '🟩',
  [LetterState.PRESENT]: '🟨',
  [LetterState.ABSENT]: '⬜',
  [LetterState.INITIAL]: null
}

const genResultGrid = () => {
  return board.value
    .slice(0, currentRowIndex.value + 1)
    .map((row) => {
      return row.map((tile) => icons[tile.state]).join('')
    })
    .join('\n')
}
</script>
