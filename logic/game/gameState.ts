import { Piece } from 'logic/positions/piece';
import { PositionName } from 'logic/positions/positionName';

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