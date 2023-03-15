import COORDS from 'logic/squares/coordinates';
import { Square } from 'logic/squares/square';

function rank (position: Square): number {
    
    return COORDS[position][1];
}

export default rank;