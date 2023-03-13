/*
caller is responsible for checking if the new 
position is on the board
*/

import { rank, file }  from 'rules/positions';
import { GridCoordinates } from 'rules/types/GridCoordinates';
import { MoveVector } from 'rules/types/MoveVector';
import positionName, { PositionName } from 'rules/positions/positionName';
    
function displaceTo  (
    currentPosition: PositionName, 
    vector: MoveVector)
    : PositionName | null {

    const newFile = file(currentPosition) + vector[0];
    const newRank = rank(currentPosition) + vector[1];
    const g: GridCoordinates = [newFile, newRank];

    return positionName(g);
};

export default displaceTo;