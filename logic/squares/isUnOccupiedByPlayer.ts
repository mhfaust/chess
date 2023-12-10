import { isUnOccupied } from 'logic/squares';
import playerAt from 'logic/squares/playerAt';
import { Square } from 'logic/squares/square';
import { Player } from 'logic/types/Player';
import { Position } from 'logic/types/Position';

function isUnOccupiedByPlayer(position: Position, square: Square, player: Player): boolean {
	if (isUnOccupied(position, square)) {
		return true;
	} else return playerAt(position, square) !== player;
}

export default isUnOccupiedByPlayer;
