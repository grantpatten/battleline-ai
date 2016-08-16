import * as _ from "lodash";

export const FLAG_COUNT = 9;

export enum Position {
  north,
  south,
  unclaimed
}

export enum BattlelineEvent {
  NameRequest, // player <north|south> name
  Colors,  // colors <color1> * 6
  Hand,  // player <north|south> hand <card1> * 7
  Claim,  // flag claim-status <unclaimed|north|south> * 9
  Flag,  // flag <1-9> cards <north|south> <card1> * 3 (optional)
  Play  // go play-card -> play <1-9> <card>
}

// Card message format:
export class Card {
  constructor(public color: string, public rank: number) {
  };

  toString() {
    return `${this.color},${this.rank}`;
  }

  static parse(card: string) {
    let [color, rankString] = card.split(",");
    return new Card(color, parseInt(rankString));
  }
}

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

  nextState(flag: number, card: Card): GameState {
    let newState = new GameState();

    newState.deck = this.deck;
    newState.claims =  this.claims;
    newState.playerPosition = this.playerPosition;
    newState.colors = this.colors;

    // Update the played cards
    newState.playedCards =  _.cloneDeep(newState.playedCards);
    newState.playedCards[flag][newState.playerPosition].push(card);

    // Update the player cards
    newState.playerCards = _.clone(this.playerCards);
    _.remove(newState.playerCards, card);

    // TODO - Calculate if we have any new claims

    return newState;
  }
}
