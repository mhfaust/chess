/*
caller is responsible for checking if the new 
position is on the board
*/

import { rank, file }  from 'logic/positions';
import { MoveVector } from 'logic/types/MoveVector';
import square, { Square } from 'logic/positions/positionName';
    
function displaceFrom  (
    currentPosition: Square, 
    vector: MoveVector)
    : Square | null {

        return square([
            file(currentPosition) - vector[0],
            rank(currentPosition) - vector[1]
        ]);
    };

export default displaceFrom;