import playerAt from 'logic/squares/playerAt';
import { isUnOccupied }  from 'logic/squares';
import { Position }  from 'logic/types/Board';
import { Player }  from 'logic/types/Player';
import { Square } from 'logic/squares/square';

function isUnOccupiedByPlayer (position: Position, square: Square, player: Player): boolean {
    if(isUnOccupied(position, square))
        return true;
    
    else return playerAt(position, square) !== player;
}

export default isUnOccupiedByPlayer;