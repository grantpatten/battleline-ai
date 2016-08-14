import {Card, Position} from "./command_parser";

export class GameState {
  public deck: Card[];
  public playedCards: Card[][][] = [];  // Flag, Position, Cards
  public claims: Position[];
  public playerPosition: Position;
  public colors: string[];
  public playerCards: Card[];

  constructor() {
    // Initialize the playing field
    for (let flag = 0; flag < 9; flag++) {
      this.playedCards[flag] = [[], []];  // No cards played for either position
    }
  };
}
