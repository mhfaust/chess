import { Piece } from 'logic/squares/piece';
import { Square } from 'logic/squares/square';

export type PawnPromoteTuple = [Square, Square];

export type PawnPromotionCallback =
  | null 
  | ((piecePromotedTo: Piece) => void);

export type GamePlayAndCursor = {
  gamePlay: string;
  boardCursor: number;
};

export type GameState =  GamePlayAndCursor & {
  actions: Actions;
  selectedSquare: Square | null;
  orientation: number;
  onPromotePawn: PawnPromotionCallback | null;
}

export type Actions = {
  init: (
    initialGamePlay: string,
    initialPosition: number,
  ) => void;
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

