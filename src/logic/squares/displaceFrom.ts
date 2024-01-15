/*
caller is responsible for checking if the new
position is on the board
*/

import { file, rank } from '@/logic/squares';
import square, { Square } from '@/logic/squares/square';
import { MoveVector } from '@/logic/types/MoveVector';

function displaceFrom(
	origin: Square,
	vector: MoveVector,
): Square | null {
	return square([
		file(origin) - vector[0],
		rank(origin) - vector[1],
	]);
}

export default displaceFrom;
