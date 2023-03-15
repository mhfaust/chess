import COORDS from 'logic/positions/coordinates';
import { Square } from 'logic/positions/positionName';

function file (position: Square): number {
    return COORDS[position][0];
};

export default file;