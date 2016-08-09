import {EventEmitter} from "events";

export enum Position {
  north,
  south,
  unclaimed
}

export enum BattlelineEvent {
  NameRequest, // player <north|south> name
  Colors,  // colors <color1> * 6
  Hand,  // player <north|south> hand <card1> * 7
  Claim,  // flag claim-status <unclaimed|north|south> * 9
  Flag,  // flag <1-9> cards <north|south> <card1> * 3 (optional)
  Play  // go play-card -> play <1-9> <card>
}

// Card message format:
export class Card {
  constructor(public color: string, public rank: number) {
  };

  toString() {
    return `${this.color},${this.rank}`;
  }

  static parse(card: string) {
    let [color, rankString] = card.split(",");
    return new Card(color, parseInt(rankString));
  }
}

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
