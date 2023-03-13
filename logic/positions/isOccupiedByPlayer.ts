import playerAt from 'rules/positions/playerAt';
import isUnOccupied from 'rules/positions/isUnOccupied';
import { Board }  from 'rules/types/Board';
import { Player }  from 'rules/types/Player';
import { PositionName } from 'rules/positions/positionName';

function isOccupiedByPlayer (board: Board, position: PositionName, player: Player): boolean{
    
    if(isUnOccupied(board, position)){
        return false;
    }
    
    else return playerAt(board, position) === player;
}

export default isOccupiedByPlayer;