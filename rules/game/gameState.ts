import { Piece } from "rules/positions/piece";
import { PositionName } from "rules/positions/positionName";

export type GameState =   {
  gamePlay: string;
  boardCursor: number;
  selectedSquare: PositionName | null;
  toggleSelectedSquare: (
    positionName: PositionName | null
  ) => void;
  makeNextMove: (
    from: PositionName, 
    to: PositionName, 
    promoteTo?: Piece, 
    captureEp?: boolean
  ) => void;

}