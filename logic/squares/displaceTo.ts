/*
caller is responsible for checking if the new 
position is on the board
*/

import { rank, file }  from 'logic/squares';
import { GridCoordinates } from 'logic/types/GridCoordinates';
import { MoveVector } from 'logic/types/MoveVector';
import square, { Square } from 'logic/squares/square';
    
function displaceTo  (
    currentPosition: Square, 
    vector: MoveVector)
    : Square | null {

    const newFile = file(currentPosition) + vector[0];
    const newRank = rank(currentPosition) + vector[1];
    const g: GridCoordinates = [newFile, newRank];

    return square(g);
};

export default displaceTo;