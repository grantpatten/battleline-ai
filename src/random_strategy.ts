import * as _ from "lodash";
import {IStrategy} from "./strategy_runner";
import {GameState} from "./game_state";
import {Card} from "./command_parser";

export class RandomStrategy implements IStrategy {
  public playCard(gameState: GameState): [number, Card] {
    let flag = _.sample(gameState.getPlayableFlags());
    let card = _.sample(gameState.playerCards);

    return [flag, card];
  };
}
