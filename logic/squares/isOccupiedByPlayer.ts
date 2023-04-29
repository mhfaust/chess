import playerAt from 'logic/squares/playerAt';
import isUnOccupied from 'logic/squares/isUnOccupied';
import { Position }  from 'logic/types/Position';
import { Player }  from 'logic/types/Player';
import { Square } from 'logic/squares/square';

function isOccupiedByPlayer (position: Position, square: Square, player: Player): boolean{
    
    if(isUnOccupied(position, square)){
        return false;
    }
    
    else return playerAt(position, square) === player;
}

export default isOccupiedByPlayer;