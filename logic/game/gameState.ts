import { coordinates } from 'logic/positions';
import { Piece } from 'logic/positions/piece';
import { PositionName } from 'logic/positions/positionName';

export type ChessGame = {
  gamePlay: string;
  boardCursor: number;
}
coordinates
export type GameView =  ChessGame & {
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