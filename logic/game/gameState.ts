import { Piece } from 'logic/squares/piece';
import { Square } from 'logic/squares/square';

export type ChessGame = {
  gamePlay: string;
  boardCursor: number;
}

export type GameView =  ChessGame & {
  selectedSquare: Square | null;
  toggleSquare: (
    square: Square | null
  ) => void;
  makeNextMove: (
    from: Square, 
    to: Square, 
    promoteTo?: Piece, 
  ) => void;
}