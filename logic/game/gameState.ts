import { Piece } from 'logic/squares/piece';
import { Square } from 'logic/squares/square';

type PawnPromoteTuple = [Square, Square]

type PawnPromotionCallback =
  | null 
  | ((piecePromotedTo: Piece) => void)

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
  rotateBoard: () => void;
  setOnPromotePawn: (t: PawnPromoteTuple | null) => void;
};

export type GameView =  GameAndCursor & {
  actions: Actions;
  selectedSquare: Square | null;
  orientation: number;
  onPromotePawn: PawnPromotionCallback | null;
}