import {GameState} from "./game_state";

export interface IHeuristic {
  getScore(gameState: GameState): number;
}

/**
 * Attempt to maximize the score in all positions.
 *
 * Score all 3 card positions based on actual rank, but score them as 0 if it is less than an opponents 3 card hand.
 * Score all 2 card positions based on the best rank that can be created from cards currently in the hand.
 * Score all 1 card positions based on the best rank that can be created from all cards currently in the hand.
 *
 * Score positions in the center higher.
 * Score positions next to already captured flags higher.
 */
export class BasicHeuristic implements IHeuristic {
  getScore(gameState: GameState): number {
    return 0;
  }
}

