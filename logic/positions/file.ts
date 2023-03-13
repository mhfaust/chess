import COORDS from 'rules/positions/coordinates';
import { PositionName } from 'rules/positions/positionName';

function file (position: PositionName): number {
    return COORDS[position][0];
};

export default file;