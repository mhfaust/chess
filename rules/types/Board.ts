import { Piece }  from 'rules/positions/piece';

export type PieceOrEmpty = Piece | null;

export type BoardFile = [
    PieceOrEmpty, 
    PieceOrEmpty, 
    PieceOrEmpty, 
    PieceOrEmpty, 
    PieceOrEmpty, 
    PieceOrEmpty, 
    PieceOrEmpty, 
    PieceOrEmpty
];

export type Board = [
    BoardFile,
    BoardFile,
    BoardFile,
    BoardFile,
    BoardFile,
    BoardFile,
    BoardFile,
    BoardFile
];
 
//note: if a Piece is null --> empty square.