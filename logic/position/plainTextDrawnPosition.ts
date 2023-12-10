import chalk from 'chalk';
import { pieceSymbols } from 'logic/constants/pieces';
import { rotateCounterClockwise } from 'logic/position/rotate';
import { Piece } from 'logic/squares/piece';
import { PieceOrEmpty, Position } from 'logic/types/Position';

const { bgWhite, black, blue } = chalk;

const topLine = '   ┌───┬───┬───┬───┬───┬───┬───┬───┐  \n';
const separLine = '   ├───┼───┼───┼───┼───┼───┼───┼───┤  \n';
const bottomLine = '   └───┴───┴───┴───┴───┴───┴───┴───┘  \n';
const filesLine = '     A   B   C   D   E   F   G   H    \n';

const pieceLine = (row: PieceOrEmpty[], i: number) => {
	const drawPiece = (p: PieceOrEmpty) => {
		return blue(pieceSymbols[p as Piece] ?? ' ');
	};
	return ` ${7 - i + 1} │ ${row.map(drawPiece).join(' │ ')} │  \n`;
};

function plainTextDrawnPosition(position: Position) {
	const pieceLines = rotateCounterClockwise<PieceOrEmpty>(position as any)
		.map(pieceLine)
		.join(separLine);

	return bgWhite(black(
		`\n${topLine}${pieceLines}${bottomLine}${filesLine}`,
	));
}

export default plainTextDrawnPosition;
