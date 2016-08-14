import {RandomStrategy} from "./random_strategy";
import {GameState} from "./game_state";
import {IStrategy} from "./strategy_runner";
import {Card, Position} from "./command_parser";

describe("Random Strategy", () => {
  let strategy: IStrategy;
  let gameState: GameState;

  beforeEach(() => {
    strategy = new RandomStrategy();
    gameState = new GameState();
  });

  it("should respond with a valid card from the players hand", () => {
    gameState.playerPosition = Position.north;
    gameState.playerCards = [new Card("red", 1)];
    gameState.claims = [
      Position.north, Position.north, Position.north,
      Position.north, Position.north, Position.north,
      Position.north, Position.unclaimed, Position.north
    ];

    let [flag, card] = strategy.playCard(gameState);
    expect(card).toEqual(new Card("red", 1));
    expect(flag).toEqual(7);
  });
});
