import {Card, Position} from "./command_parser";

export class GameState {
  public deck: Card[];
  public playedCards: Card[][][] = [];  // Side, Position, Number
  public claims: Position[];
  public playerPosition: Position;
  public colors: string[];
  public playerCards: Card[];

  constructor() {
    // Initialize the playing field
    for (let position of [Position.north, Position.south]) {
      this.playedCards[position] = [];

      for (let flag = 0; flag < 9; flag++) {
        this.playedCards[position][flag] = [null, null, null];
      }
    }
  };
}
