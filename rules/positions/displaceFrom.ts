/*
caller is responsible for checking if the new 
position is on the board
*/

import { rank, file }  from 'rules/positions';
import { MoveVector } from 'rules/types/MoveVector';
import positionName, { PositionName } from 'rules/positions/positionName';
    
function displaceFrom  (
    currentPosition: PositionName, 
    vector: MoveVector)
    : PositionName | null {

        return positionName([
            file(currentPosition) - vector[0],
            rank(currentPosition) - vector[1]
        ]);
    };

export default displaceFrom;