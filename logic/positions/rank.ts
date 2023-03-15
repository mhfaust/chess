import COORDS from 'logic/positions/coordinates';
import { Square } from 'logic/positions/positionName';

function rank (position: Square): number {
    
    return COORDS[position][1];
}

export default rank;