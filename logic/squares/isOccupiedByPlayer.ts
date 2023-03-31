import playerAt from 'logic/squares/playerAt';
import isUnOccupied from 'logic/squares/isUnOccupied';
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Square } from 'logic/squares/square';

function isOccupiedByPlayer (board: Board, square: Square, player: Player): boolean{
    
    if(isUnOccupied(board, square)){
        return false;
    }
    
    else return playerAt(board, square) === player;
}

export default isOccupiedByPlayer;