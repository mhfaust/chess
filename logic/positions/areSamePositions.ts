import { positionName } from 'rules/positions';
import { GridCoordinates } from 'rules/types/GridCoordinates';

function areSamePositions  (
    posA: GridCoordinates, 
    posB: GridCoordinates)
    : boolean {
        return positionName(posA) === positionName(posB)
    } 

export default areSamePositions;