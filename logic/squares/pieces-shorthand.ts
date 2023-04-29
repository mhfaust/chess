import { Piece }  from 'logic/squares/piece';
import { PieceOrEmpty } from 'logic/types/Position';

export const __ : PieceOrEmpty = null;
export const WK : Piece = 'White King';
export const WQ : Piece = 'White Queen';
export const WB : Piece = 'White Bishop';
export const WN : Piece = 'White Knight';
export const WR : Piece = 'White Rook';
export const WP : Piece = 'White Pawn';
export const BK : Piece = 'Black King';
export const BQ : Piece = 'Black Queen';
export const BB : Piece = 'Black Bishop';
export const BN : Piece = 'Black Knight';
export const BR : Piece = 'Black Rook';
export const BP : Piece = 'Black Pawn';

const shorts = new Map<Piece, string>([
  ['White King', 'WK'],
  ['White Queen', 'WQ'],
  ['White Bishop', 'WB'],
  ['White Knight', 'WN'],
  ['White Rook', 'WR'],
  ['White Pawn', 'WP'],
  ['Black King', 'BK'],
  ['Black Queen', 'BQ'],
  ['Black Bishop', 'BB'],
  ['Black Knight', 'BN'],
  ['Black Rook', 'BR'],
  ['Black Pawn', 'BP'],
])

export const shorthand = (p: PieceOrEmpty): string => {
    return p && shorts.get(p) || '__';
}