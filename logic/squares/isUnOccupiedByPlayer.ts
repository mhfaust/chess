import playerAt from 'logic/squares/playerAt';
import { isUnOccupied }  from 'logic/squares';
import { Board }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Square } from 'logic/squares/square';

function isUnOccupiedByPlayer (board: Board, square: Square, player: Player): boolean {
    if(isUnOccupied(board, square))
        return true;
    
    else return playerAt(board, square) !== player;
}

export default isUnOccupiedByPlayer;