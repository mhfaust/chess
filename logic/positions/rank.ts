import COORDS from 'logic/positions/coordinates';
import { PositionName } from 'logic/positions/positionName';

function rank (position: PositionName): number {
    
    return COORDS[position][1];
}

export default rank;