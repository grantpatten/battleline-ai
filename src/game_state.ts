import * as _ from "lodash";

import {Card, Position} from "./command_parser";

const FLAG_COUNT = 9;

export class GameState {
  public deck: Card[];
  public playedCards: Card[][][] = [];  // Flag, Position, Cards
  public claims: Position[] = [];
  public playerPosition: Position;
  public colors: string[];
  public playerCards: Card[];

  constructor() {
    // Initialize the playing field
    for (let flag = 0; flag < FLAG_COUNT; flag++) {
      this.playedCards[flag] = [[], []];  // No cards played for either position
      this.claims[flag] = Position.unclaimed;
    }
  };

  getPlayableFlags(): number[] {
    return _.range(FLAG_COUNT).filter(flag => this.isPlayableFlag(flag));
  }

  isPlayableFlag(flag: number): boolean {
    return this.claims[flag] === Position.unclaimed &&
      this.playedCards[flag][this.playerPosition].length < 3;
  }
}
