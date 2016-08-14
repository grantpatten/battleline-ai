import {Position, Card} from "./command_parser";
import {GameState} from "./game_state";

export interface IStrategy {
  // Returns the position (0-8) and Card to play
  playCard(GameState): [number, Card];
}

export class StrategyRunner {
  public gameState: GameState;

  constructor(public strategy: IStrategy) {
    this.gameState = new GameState();
  }

  onNameRequest(position: Position): string {
    this.gameState.playerPosition = position;
    return `player ${Position[position]} Grant`;
  }

  onHand(cards: Card[]) {
    this.gameState.playerCards = cards;
  }

  onColors(colors: string[]) {
    this.gameState.colors = colors;
  }

  onFlag(flagNum: number, position: Position, cards: Card[]) {
    this.gameState.playedCards[flagNum - 1][position] = cards;
  }

  onClaim(claimStatus: Position[]) {
    this.gameState.claims = claimStatus;
  }

  onPlay(): string {
    let [flag, card] = this.strategy.playCard(this.gameState);
    return `play ${flag + 1} ${card}`;
  }
}
