import { LetterState, TileType } from "../types";

const checkWord = (
  letters: string[],
  board: Array<Array<TileType>>
): boolean => {
  // for each candidate word (row in board)
  for (const row of board) {
    // used ground truth letter should not be counted again
    const used: { [key: number]: boolean } = {};

    // check correct (green)
    // should be in the correct spot
    for (const i in row) {
      const tile = row[i];
      if (tile.state === LetterState.CORRECT) {
        if (tile.letter !== letters[i]) return false;
        used[i] = true;
      }
    }

    // check present (yellow)
    // shoule be in the word but in the wrong spot
    for (const i in row) {
      const tile = row[i];
      if (tile.state === LetterState.PRESENT) {
        // should be green rather than yellow, so it fails
        if (tile.letter === letters[i]) return false;

        // should appears in other letters
        let isPresent = false;
        for (const j in letters) {
          if (letters[j] === tile.letter && !used[j]) {
            isPresent = true;
            used[j] = true;
            break;
          }
        }
        if (!isPresent) return false;
      }
    }

    // check absent (gray)
    // should be not in the word in any spot
    for (const i in row) {
      const tile = row[i];
      if (tile.state === LetterState.ABSENT) {
        for (const j in letters) {
          if (letters[j] === tile.letter && !used[j]) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

export const guessPossibleWords = (
  pool: string[],
  board: Array<Array<TileType>>
) => {
  const possibleWords: string[] = [];

  // for each word in dictionary
  pool.forEach((word) => {
    const letters: string[] = word.split("");
    if (checkWord(letters, board)) possibleWords.push(word);
  });

  return possibleWords;
};
