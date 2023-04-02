import { Piece } from 'logic/squares/piece';
import { Square } from 'logic/squares/square';

export type PawnPromoteTuple = [Square, Square]

export type PawnPromotionCallback =
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
  move: (
    from: Square, 
    to: Square, 
    promoteTo?: Piece, 
  ) => void;
  toggleBoard: (
    boardIndex: number
  ) => void;
  rotateBoard: () => void;
  promptToPromotePawn: (t: PawnPromoteTuple | null) => void;
};

export type GameView =  GameAndCursor & {
  actions: Actions;
  selectedSquare: Square | null;
  orientation: number;
  onPromotePawn: PawnPromotionCallback | null;
}