import * as _ from "lodash";
import {IStrategy} from "./strategy_runner";
import {GameState, Card} from "./game_state";
import {IHeuristic} from "./heuristics";

/**
 * Play a basic strategy
 *
 * Given all possible playing positions, make the move that maximizes game state heuristic.
 */
export class HeuristicStrategy implements IStrategy {
  constructor(public heuristic: IHeuristic) {};

  public playCard(gameState: GameState): [number, Card] {
    let bestScore = -Infinity;
    let bestFlag;
    let bestCard;

    for (let flag of gameState.getPlayableFlags()) {
      for (let card of gameState.playerCards) {
        let nextGameState = gameState.nextState(flag, card);
        let newScore = this.heuristic.getScore(nextGameState);

        if (newScore > bestScore) {
          bestScore = newScore;
          bestFlag = flag;
          bestCard = card;
        }
      }
    }

    return [bestFlag, bestCard];
  };
}
