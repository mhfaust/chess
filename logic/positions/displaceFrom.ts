/*
caller is responsible for checking if the new 
position is on the board
*/

import { rank, file }  from 'logic/positions';
import { MoveVector } from 'logic/types/MoveVector';
import positionName, { Square } from 'logic/positions/positionName';
    
function displaceFrom  (
    currentPosition: Square, 
    vector: MoveVector)
    : Square | null {

        return positionName([
            file(currentPosition) - vector[0],
            rank(currentPosition) - vector[1]
        ]);
    };

export default displaceFrom;