import { positionName } from 'rules/positions';

function areSamePositions  (
    posA: GridCoordinates, 
    posB: GridCoordinates)
    : boolean {
        return positionName(posA) === positionName(posB)
    } 

export default areSamePositions;