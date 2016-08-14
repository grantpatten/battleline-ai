import {RandomStrategy} from "./random_strategy";
import {GameState} from "./game_state";
import {IStrategy} from "./strategy_runner";
import {Card} from "./command_parser";

describe("Random Strategy", () => {
  let strategy: IStrategy;
  let gameState: GameState;

  beforeEach(() => {
    strategy = new RandomStrategy();
    gameState = new GameState();
  });

  it("should respond with a valid card from the players hand", () => {
    gameState.playerCards = [new Card("red", 1)];

    let [flag, card] = strategy.playCard(gameState);
    expect(card).toEqual(new Card("red", 1));
    expect(flag).toBeLessThan(10);
    expect(flag).toBeGreaterThan(-1);
  });
});
