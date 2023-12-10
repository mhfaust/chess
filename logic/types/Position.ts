import { Piece } from 'logic/squares/piece';

export type PieceOrEmpty = Piece | null;

export type PositionFile = [
	PieceOrEmpty,
	PieceOrEmpty,
	PieceOrEmpty,
	PieceOrEmpty,
	PieceOrEmpty,
	PieceOrEmpty,
	PieceOrEmpty,
	PieceOrEmpty,
];

export type Position = [
	PositionFile,
	PositionFile,
	PositionFile,
	PositionFile,
	PositionFile,
	PositionFile,
	PositionFile,
	PositionFile,
];

// note: if a Piece is null --> empty square.
