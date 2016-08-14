import {GameState} from "./game_state";
import {Position, Card} from "./command_parser";


describe("Game State", () => {
  let gameState;

  beforeEach(() => {
    gameState = new GameState();
  });

  it("should initialize the game with no cards played", () => {
    expect(gameState.playedCards.length).toEqual(2);
    expect(gameState.playedCards[0].length).toEqual(9);
    expect(gameState.playedCards[0][0].length).toEqual(3);

    expect(gameState.playedCards).toEqual([
      // North
      [
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      // South
      [
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    ]);
  });
});
