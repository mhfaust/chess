import COORDS from 'logic/positions/coordinates';
import { PositionName } from 'logic/positions/positionName';

function file (position: PositionName): number {
    return COORDS[position][0];
};

export default file;