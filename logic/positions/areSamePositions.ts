import { square } from 'logic/positions';
import { GridCoordinates } from 'logic/types/GridCoordinates';

function areSamePositions  (
    coordsA: GridCoordinates, 
    coordsB: GridCoordinates)
    : boolean {
        return square(coordsA) === square(coordsB)
    } 

export default areSamePositions;