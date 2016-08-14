import {CommandParser} from "./command_parser";
import {Card, BattlelineEvent, Position} from "./game_state";

describe("Cards", () => {
  it("should parse new cards", () => {
    let card = Card.parse("somecolor,1");

    expect(card.color).toEqual("somecolor");
    expect(card.rank).toEqual(1);
  });

  it("should check card equality", () => {
    expect(new Card("red", 10)).toEqual(new Card("red", 10));
    expect(new Card("red", 10)).not.toEqual(new Card("blue", 10));
    expect(new Card("red", 10)).not.toEqual(new Card("red", 5));
  });

  it("should convert cards to strings", () => {
    let card = new Card("red", 10);
    expect(card.toString()).toEqual("red,10");
  });
});


describe("Command Parser", () => {
  let commandParser;

  beforeEach(() => {
    commandParser = new CommandParser();
    spyOn(commandParser, "emit");
  });

  it("should parse a name request for the north", () => {
    commandParser.parseEvent("player north name");
    expect(commandParser.emit).toHaveBeenCalledWith(
      BattlelineEvent[BattlelineEvent.NameRequest],
      Position.north);
  });

  it("should parse a name request for the south", () => {
    commandParser.parseEvent("player south name");
    expect(commandParser.emit).toHaveBeenCalledWith(
      BattlelineEvent[BattlelineEvent.NameRequest],
      Position.south);
  });

  it("should parse a colors definition", () => {
    commandParser.parseEvent("colors color1 color2 color3 color4 color5 color6");
    expect(commandParser.emit).toHaveBeenCalledWith(
      BattlelineEvent[BattlelineEvent.Colors], [
      "color1",
      "color2",
      "color3",
      "color4",
      "color5",
      "color6"
    ]);
  });

  it("should parse a hand definition", () => {
    commandParser.parseEvent("player north hand color2,3 color4,10, color4,9 color1,6 color6,1 color3,1 color2,8");
    expect(commandParser.emit).toHaveBeenCalledWith(
      BattlelineEvent[BattlelineEvent.Hand], [
        new Card("color2", 3),
        new Card("color4", 10),
        new Card("color4", 9),
        new Card("color1", 6),
        new Card("color6", 1),
        new Card("color3", 1),
        new Card("color2", 8),
      ]);
  });

  it("should parse a hand definition with no cards", () => {
    commandParser.parseEvent("player north hand");
    expect(commandParser.emit).toHaveBeenCalledWith(
      BattlelineEvent[BattlelineEvent.Hand], []);
  });

  it("should parse a claim definition", () => {
    commandParser.parseEvent("flag claim-status north north north south north south north south unclaimed");
    expect(commandParser.emit).toHaveBeenCalledWith(
      BattlelineEvent[BattlelineEvent.Claim], [
        Position.north,
        Position.north,
        Position.north,
        Position.south,
        Position.north,
        Position.south,
        Position.north,
        Position.south,
        Position.unclaimed
      ]);
  });

  it("should parse a flag card definition with no cards", () => {
    commandParser.parseEvent("flag 2 cards north");
    expect(commandParser.emit).toHaveBeenCalledWith(
      BattlelineEvent[BattlelineEvent.Flag], 2, Position.north, []);
  });

  it("should parse a flag card definition", () => {
    commandParser.parseEvent("flag 5 cards south color1,9 color2,1 color3,2");
    expect(commandParser.emit).toHaveBeenCalledWith(
      BattlelineEvent[BattlelineEvent.Flag], 5, Position.south, [
        new Card("color1", 9),
        new Card("color2", 1),
        new Card("color3", 2),
      ]);
  });

  it("should parse a play request", () => {
    commandParser.parseEvent("go play-card");
    expect(commandParser.emit).toHaveBeenCalledWith(BattlelineEvent[BattlelineEvent.Play]);
  });

});
