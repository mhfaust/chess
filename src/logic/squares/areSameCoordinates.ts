import { square } from '@/logic/squares';
import { GridCoordinates } from '@/logic/types/GridCoordinates';

function areSameCoordinates(
	coordsA: GridCoordinates,
	coordsB: GridCoordinates,
): boolean {
	return square(coordsA) === square(coordsB);
}

export default areSameCoordinates;
