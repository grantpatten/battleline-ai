import {GameState} from "./game_state";
import {Position, Card} from "./command_parser";


describe("Game State", () => {
  let gameState;

  beforeEach(() => {
    gameState = new GameState();
  });

  it("should initialize the game with no cards played", () => {
    expect(gameState.playedCards.length).toEqual(9);  // Cards
    expect(gameState.playedCards[0].length).toEqual(2);  // Positions
    expect(gameState.playedCards[0][0].length).toEqual(0);  // Cards

    expect(gameState.playedCards).toEqual([
      [[], []], // Flag 1
      [[], []], // Flag 2
      [[], []], // Flag 3
      [[], []], // Flag 4
      [[], []], // Flag 5
      [[], []], // Flag 6
      [[], []], // Flag 7
      [[], []], // Flag 8
      [[], []], // Flag 9
    ]);
  });

  it("should check if a flag can be played", () => {
    gameState.playerPosition = Position.north;

    gameState.claims[0] = Position.unclaimed;
    expect(gameState.isPlayableFlag(0)).toBeTruthy();

    gameState.claims[0] = Position.north;
    expect(gameState.isPlayableFlag(0)).toBeFalsy();

    gameState.claims[0] = Position.unclaimed;
    gameState.playedCards[0][Position.north] = [
      new Card("red", 1), new Card("red", 2), new Card("red", 3)
    ];
    expect(gameState.isPlayableFlag(0)).toBeFalsy();

    gameState.playerPosition = Position.south;
    expect(gameState.isPlayableFlag(0)).toBeTruthy();
  });

  it("should return a list of all flags that can be played", () => {
    gameState.playerPosition = Position.north;
    expect(gameState.getPlayableFlags()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);

    gameState.claims = [
      Position.north, Position.north, Position.north,
      Position.north, Position.north, Position.north,
      Position.unclaimed, Position.unclaimed, Position.unclaimed
    ];

    // Make sure 3 cards is no longer valid
    gameState.playedCards[6][Position.north] = [
      new Card("red", 1), new Card("red", 2), new Card("red", 3)
    ];

    expect(gameState.getPlayableFlags()).toEqual([7, 8]);
  });
});
