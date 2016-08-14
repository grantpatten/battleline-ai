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
});
