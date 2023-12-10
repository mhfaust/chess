import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from 'logic/squares/pieces-shorthand';
import { Position, PositionFile } from 'logic/types/Position';

const { freeze } = Object;

export const initialPosition: Position = Object.freeze([
	/*                 1  2  3  4  5  6  7  8  */
	/*  A  */ freeze([WR, WP, __, __, __, __, BP, BR]) as PositionFile,
	/*  B  */ freeze([WN, WP, __, __, __, __, BP, BN]) as PositionFile,
	/*  C  */ freeze([WB, WP, __, __, __, __, BP, BB]) as PositionFile,
	/*  D  */ freeze([WQ, WP, __, __, __, __, BP, BQ]) as PositionFile,
	/*  E  */ freeze([WK, WP, __, __, __, __, BP, BK]) as PositionFile,
	/*  F  */ freeze([WB, WP, __, __, __, __, BP, BB]) as PositionFile,
	/*  G  */ freeze([WN, WP, __, __, __, __, BP, BN]) as PositionFile,
	/*  H  */ freeze([WR, WP, __, __, __, __, BP, BR]) as PositionFile,
]) as Position;
