export const enum LetterState {
  INITIAL = 0,
  CORRECT = "correct",
  PRESENT = "present",
  ABSENT = "absent"
}

export type TileType = {
  letter: string;
  state: LetterState;
};
