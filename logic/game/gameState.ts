import { Piece } from 'logic/squares/piece';
import { Square } from 'logic/squares/square';

export type GameAndCursor = {
  gamePlay: string;
  boardCursor: number;
}

export type Actions = {
  toggleSquare: (
    square: Square | null
  ) => void;
  makeNextMove: (
    from: Square, 
    to: Square, 
    promoteTo?: Piece, 
  ) => void;
  toggleBoard: (
    boardIndex: number
  ) => void;
};

export type GameView =  GameAndCursor & {
  selectedSquare: Square | null;
  actions: Actions
}