/*
caller is responsible for checking if the new 
position is on the board
*/

import { rank, file }  from 'logic/squares';
import { MoveVector } from 'logic/types/MoveVector';
import square, { Square } from 'logic/squares/square';
    
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