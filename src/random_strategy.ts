
import {IStrategy} from "./strategy_runner";

export class RandomStrategy implements IStrategy {
  public playCard(gameState: GameState): [number, Card] {
    let flag = _.random(1, 9);
    return [flag, _.sample(gameState.playerCards)];
  };
}
