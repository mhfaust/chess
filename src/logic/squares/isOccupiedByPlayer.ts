import isUnOccupied from '@/logic/squares/isUnOccupied';
import playerAt from '@/logic/squares/playerAt';
import { Square } from '@/logic/squares/square';
import { Player } from '@/logic/types/Player';
import { Position } from '@/logic/types/Position';

function isOccupiedByPlayer(position: Position, square: Square, player: Player): boolean {
	if (isUnOccupied(position, square)) {
		return false;
	} else return playerAt(position, square) === player;
}

export default isOccupiedByPlayer;
