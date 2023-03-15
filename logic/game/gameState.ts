import { coordinates } from 'logic/squares';
import { Piece } from 'logic/squares/piece';
import { Square } from 'logic/squares/square';

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