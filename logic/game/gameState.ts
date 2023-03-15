import { coordinates } from 'logic/positions';
import { Piece } from 'logic/positions/piece';
import { Square } from 'logic/positions/square';

export type ChessGame = {
  gamePlay: string;
  boardCursor: number;
}
coordinates
export type GameView =  ChessGame & {
  selectedSquare: Square | null;
  toggleSelectedSquare: (
    positionName: Square | null
  ) => void;
  makeNextMove: (
    from: Square, 
    to: Square, 
    promoteTo?: Piece, 
    captureEp?: boolean
  ) => void;
}