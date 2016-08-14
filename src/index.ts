import * as readline from "readline";
import {CommandParser} from "./command_parser";
import {StrategyRunner} from "./strategy_runner";
import {RandomStrategy} from "./random_strategy";
import {Card, BattlelineEvent, Position} from "./game_state";

// Parse all commands as the enter the system
const commandParser = new CommandParser();

// Configure the strategies
const strategy = new RandomStrategy();
const strategyRunner = new StrategyRunner(strategy);

// Connect the strategy runner to incoming commands
// All returned values are written to stdout
commandParser.on(BattlelineEvent[BattlelineEvent.NameRequest],
  (position: Position) => console.log(strategyRunner.onNameRequest(position))
);

commandParser.on(BattlelineEvent[BattlelineEvent.Colors],
  (colors: string[]) => strategyRunner.onColors(colors)
);

commandParser.on(BattlelineEvent[BattlelineEvent.Hand],
  (cards: Card[]) => strategyRunner.onHand(cards)
);

commandParser.on(BattlelineEvent[BattlelineEvent.Claim],
  (claimStatus: Position[]) => strategyRunner.onClaim(claimStatus)
);

commandParser.on(BattlelineEvent[BattlelineEvent.Flag],
  (flagNum: number, position: Position, cards: Card[]) => strategyRunner.onFlag(flagNum, position, cards)
);

commandParser.on(BattlelineEvent[BattlelineEvent.Play],
  () => console.log(strategyRunner.onPlay())
);

// Main game loop. Parse incoming events and generate responses
const lineReader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

lineReader.on("line", line => {
  commandParser.parseEvent(line);
});
