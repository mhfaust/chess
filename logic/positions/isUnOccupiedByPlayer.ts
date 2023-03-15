import playerAt from 'logic/positions/playerAt';
import { isUnOccupied }  from 'logic/positions';
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Square } from 'logic/positions/positionName';

function isUnOccupiedByPlayer (board: Board, position: Square, player: Player): boolean {
    if(isUnOccupied(board, position))
        return true;
    
    else return playerAt(board, position) !== player;
}

export default isUnOccupiedByPlayer;