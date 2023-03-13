import playerAt from 'rules/positions/playerAt';
import { isUnOccupied }  from 'rules/positions';
import { Board }  from 'rules/types/Board';
import { Player }  from 'rules/types/Player';
import { PositionName } from 'rules/positions/positionName';

function isUnOccupiedByPlayer (board: Board, position: PositionName, player: Player): boolean {
    if(isUnOccupied(board, position))
        return true;
    
    else return playerAt(board, position) !== player;
}

export default isUnOccupiedByPlayer;