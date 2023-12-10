import {
	bishopVectors,
	kingVectors,
	knightVectors,
	pawnBlackAdvanceVectors,
	pawnBlackAttackVectors,
	pawnWhiteAdvanceVectors,
	pawnWhiteAttackVectors,
	rookVectors,
} from 'logic/constants/move-vectors';
import { displaceFrom, pieceAt, playerAt } from 'logic/squares';

import { Square } from 'logic/squares/square';
import { Player } from 'logic/types/Player';
import { Position } from 'logic/types/Position';

import { canMoveTo } from 'logic/moves';
import isPawn from 'logic/pieces/isPawn';
import COORDS from 'logic/squares/coordinates';
import { Piece } from 'logic/squares/piece';
import { __, BB, BK, BN, BP, BQ, BR, WB, WK, WN, WP, WQ, WR } from 'logic/squares/pieces-shorthand';
import { GridCoordinates } from 'logic/types/GridCoordinates';
import { MoveVector } from 'logic/types/MoveVector';

export type AttackPattern = {
	vectors: ReadonlyArray<MoveVector>;
	canMoveLikeThis: Set<Piece>;
	limit: number;
};

const whiteAttackPatterns: Array<AttackPattern> = [
	{ vectors: pawnWhiteAttackVectors, canMoveLikeThis: new Set([WP]), limit: 1 },
	{ vectors: pawnWhiteAdvanceVectors, canMoveLikeThis: new Set([WP]), limit: 1 },
	{ vectors: kingVectors, canMoveLikeThis: new Set([WK, WQ]), limit: 1 },
	{ vectors: knightVectors, canMoveLikeThis: new Set([WN]), limit: 1 },
	{ vectors: bishopVectors, canMoveLikeThis: new Set([WB, WQ]), limit: 0 },
	{ vectors: rookVectors, canMoveLikeThis: new Set([WR, WQ]), limit: 0 },
];

const blackAttackPatterns: Array<AttackPattern> = [
	{ vectors: pawnBlackAttackVectors, canMoveLikeThis: new Set([BP]), limit: 1 },
	{ vectors: pawnBlackAdvanceVectors, canMoveLikeThis: new Set([BP]), limit: 1 },
	{ vectors: kingVectors, canMoveLikeThis: new Set([BK, BQ]), limit: 1 },
	{ vectors: knightVectors, canMoveLikeThis: new Set([BN]), limit: 1 },
	{ vectors: bishopVectors, canMoveLikeThis: new Set([BB, BQ]), limit: 0 },
	{ vectors: rookVectors, canMoveLikeThis: new Set([BR, BQ]), limit: 0 },
];

function* generateLinesOfAttack(
	position: Position,
	attacker: Player,
	target: Square,
): IterableIterator<GridCoordinates[]> {
	if (!target) {
		return;
	}
	let attackPatterns = attacker === 'Black' ? blackAttackPatterns : whiteAttackPatterns;
	const attackLines = new Map<Square, GridCoordinates[]>();

	for (let attackPattern of attackPatterns) {
		const { vectors, limit, canMoveLikeThis: canAttackLikeThis } = attackPattern;

		for (let vector of vectors) {
			const attackLine: GridCoordinates[] = [];
			let examinedSquare = displaceFrom(target, vector);
			let step = 0;
			while (examinedSquare && ++step) {
				attackLine.push(COORDS[examinedSquare]);
				const pieceThere = pieceAt(position, examinedSquare);
				if (pieceThere) {
					if (
						playerAt(position, examinedSquare) === attacker
						&& canAttackLikeThis.has(pieceThere)
						&& !attackLines.has(examinedSquare)
						&& (!isPawn(pieceThere) || canMoveTo(position, examinedSquare, target))
					) {
						yield attackLine;
						attackLines.set(examinedSquare, attackLine);
					}
					break; // found a piece, done with vector
				} else if (limit && step === limit) {
					break; // attack patten only goes one or two out (knight, pawn, or king). done with vector.
				}

				examinedSquare = displaceFrom(examinedSquare, vector);
			}
		}
	}
	return null;
}

export default generateLinesOfAttack;
