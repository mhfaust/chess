import { positionName } from 'logic/positions';
import { GridCoordinates } from 'logic/types/GridCoordinates';

function areSamePositions  (
    posA: GridCoordinates, 
    posB: GridCoordinates)
    : boolean {
        return positionName(posA) === positionName(posB)
    } 

export default areSamePositions;