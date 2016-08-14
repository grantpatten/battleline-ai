import {EventEmitter} from "events";
import {BattlelineEvent, Card, Position} from "./game_state";


export class CommandParser extends EventEmitter {
  parseEvent(command: string) {

    if (!command) {
      return;
    }

    let splitCommand = command.trim().split(" ");

    if (!splitCommand) {
      return;
    }

    switch (splitCommand[0]) {
      case "player":
        switch (splitCommand[2]) {
          case "name":
            this.emit(BattlelineEvent[BattlelineEvent.NameRequest], Position[splitCommand[1]]);
            break;
          case "hand":
            this.emit(BattlelineEvent[BattlelineEvent.Hand], splitCommand.slice(3).map(Card.parse));
            break;
        }
        break;
      case "colors":
        this.emit(BattlelineEvent[BattlelineEvent.Colors], splitCommand.slice(1));
        break;
      case "flag":
        if (splitCommand[1] === "claim-status") {
          this.emit(BattlelineEvent[BattlelineEvent.Claim], splitCommand.slice(2).map(pos => Position[pos]));
        } else {
          let flagNum = parseInt(splitCommand[1]);
          this.emit(
            BattlelineEvent[BattlelineEvent.Flag],
            flagNum,
            Position[splitCommand[3]],
            splitCommand.slice(4).map(Card.parse));
        }
        break;
      case "go":
        this.emit(BattlelineEvent[BattlelineEvent.Play]);
        break;
    }
  }
}
