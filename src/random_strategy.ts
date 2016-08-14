import * as _ from "lodash";
import {IStrategy} from "./strategy_runner";
import {GameState, Card} from "./game_state";

export class RandomStrategy implements IStrategy {
  public playCard(gameState: GameState): [number, Card] {
    let flag = _.sample(gameState.getPlayableFlags());
    let card = _.sample(gameState.playerCards);

    return [flag, card];
  };
}
