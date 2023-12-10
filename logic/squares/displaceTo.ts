/*
caller is responsible for checking if the new
square is on the board
*/

import { file, rank } from 'logic/squares';
import square, { Square } from 'logic/squares/square';
import { GridCoordinates } from 'logic/types/GridCoordinates';
import { MoveVector } from 'logic/types/MoveVector';

function displaceTo(
	origin: Square,
	vector: MoveVector,
): Square | null {
	const newFile = file(origin) + vector[0];
	const newRank = rank(origin) + vector[1];
	const g: GridCoordinates = [newFile, newRank];

	return square(g);
}

export default displaceTo;
