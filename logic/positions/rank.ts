import COORDS from 'rules/positions/coordinates';
import { PositionName } from 'rules/positions/positionName';

function rank (position: PositionName): number {
    
    return COORDS[position][1];
}

export default rank;