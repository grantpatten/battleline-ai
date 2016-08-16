import {HeuristicStrategy} from "./heuristic_strategy";
import {GameState, Card, Position} from "./game_state";
import {IStrategy} from "./strategy_runner";
import {IHeuristic} from "./heuristics";

class DumbHeuristic implements IHeuristic {
  getScore(gameState: GameState): number {
    return 0;
  }
}

describe("Basic Strategy", () => {
  let strategy: IStrategy;
  let gameState: GameState;
  let heuristic: IHeuristic;

  beforeEach(() => {
    heuristic = new DumbHeuristic();
    strategy = new HeuristicStrategy(heuristic);
    gameState = new GameState();
  });
});
