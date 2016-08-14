import {StrategyRunner} from "./strategy_runner";
import {Position, Card} from "./command_parser";
import {RandomStrategy} from "./random_strategy";


describe("Strategy Runner", () => {
  let strategyRunner;
  let strategy;

  beforeEach(() => {
    strategy = new RandomStrategy();
    strategyRunner = new StrategyRunner(strategy);
    spyOn(strategy, "playCard").and.returnValue([0, new Card("red", 1)]);
  });

  it("should respond to the name request", () => {
    expect(strategyRunner.onNameRequest(Position.north)).toEqual("player north Grant");
    expect(strategyRunner.gameState.playerPosition).toEqual(Position.north);
    expect(strategyRunner.onNameRequest(Position.south)).toEqual("player south Grant");
    expect(strategyRunner.gameState.playerPosition).toEqual(Position.south);
  });

  it("should store the player's cards", () => {
    strategyRunner.onHand([new Card("red", 1), new Card("blue", 2)]);
    expect(strategyRunner.gameState.playerCards).toEqual([new Card("red", 1), new Card("blue", 2)]);
  });

  it("should store the card colors", () => {
    strategyRunner.onColors(["red", "green", "blue"]);
    expect(strategyRunner.gameState.colors).toEqual(["red", "green", "blue"]);
  });

  it("should update the played cards", () => {
    strategyRunner.onFlag(1, Position.north, [new Card("red", 1)]);
    expect(strategyRunner.gameState.playedCards[0]).toEqual(
      [
        [new Card("red", 1)],
        []
      ]);

    strategyRunner.onFlag(1, Position.south, [new Card("blue", 2)]);
    expect(strategyRunner.gameState.playedCards[0]).toEqual(
      [
        [new Card("red", 1)],
        [new Card("blue", 2)]
      ]);
  });

  it("should store the claim status", () => {
    strategyRunner.onClaim([Position.unclaimed, Position.north, Position.south]);
    expect(strategyRunner.gameState.claims).toEqual([Position.unclaimed, Position.north, Position.south]);
  });

  it("should play a card when requested", () => {
    expect(strategyRunner.onPlay()).toEqual("play 1 red,1");
  });
});
