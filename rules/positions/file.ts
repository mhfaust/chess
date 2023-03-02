import COORDS from 'rules/positions/coordinates';
import { PositionName } from 'rules/positions/positionName';

function file (position: PositionName): number {
    if(!COORDS[position]){
        console.log(`No coordinates because position is: ${position}`)
    }
    return COORDS[position][0];
};

export default file;