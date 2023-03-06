import { Piece }  from 'rules/positions/piece';

const blackPieces : ReadonlyArray<Piece> = Object.freeze([
    'Black King',
    'Black Queen',
    'Black Rook',
    'Black Knight',
    'Black Bishop',
    'Black Pawn'
]);
const whitePieces  : ReadonlyArray<Piece> = Object.freeze([
    'White King',
    'White Queen',
    'White Rook',
    'White Knight',
    'White Bishop',
    'White Pawn'
]);

export const BLACK_PIECES = Object.freeze(new Set(blackPieces));
export const WHITE_PIECES = Object.freeze(new Set(whitePieces));
export const ALL_PIECES = Object.freeze(new Set([...blackPieces, ...whitePieces]));

export const unicodeSymbols: Record<Piece, string> = Object.freeze({
    'White King': '♔',
    'White Queen': '♕',
    'White Rook': '♖',
    'White Bishop': '♗',
    'White Knight': '♘',
    'White Pawn': '♙',
    'Black King': '♚',
    'Black Queen': '♛',
    'Black Rook': '♜',
    'Black Bishop': '♝',
    'Black Knight': '♞',
    'Black Pawn': '♟',
});