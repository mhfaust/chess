import COORDS from '@/logic/squares/coordinates';
import { Square } from '@/logic/squares/square';

function file(square: Square): number {
	return COORDS[square][0];
}

export default file;
