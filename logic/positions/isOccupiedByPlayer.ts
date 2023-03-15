import playerAt from 'logic/positions/playerAt';
import isUnOccupied from 'logic/positions/isUnOccupied';
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Square } from 'logic/positions/square';

function isOccupiedByPlayer (board: Board, position: Square, player: Player): boolean{
    
    if(isUnOccupied(board, position)){
        return false;
    }
    
    else return playerAt(board, position) === player;
}

export default isOccupiedByPlayer;