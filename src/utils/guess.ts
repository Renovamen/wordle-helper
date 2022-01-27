import { LetterState, TileType } from "../types";

const checkWord = (
  letters: string[],
  board: Array<Array<TileType>>
): boolean => {
  // for each tried word (row in board)
  for (const row of board) {
    // check correct (green)
    // should be in the correct spot
    for (const i in row) {
      const tile = row[i];
      if (tile.state === LetterState.CORRECT && tile.letter !== letters[i])
        return false;
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
        for (const letter of letters) {
          if (letter === tile.letter) {
            isPresent = true;
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
        for (const letter of letters) {
          if (letter === tile.letter) {
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
