import { generateLinesOfAttack }  from 'logic/check'
import { Player }  from 'logic/types/Player';
import { Position }  from 'logic/types/Position';
import kingSquare  from 'logic/squares/kingSquare';
import { otherPlayer } from 'logic/squares';

const cache = new Map<Player, Map<Position, boolean>>()
    .set('Black', new Map())
    .set('White', new Map())

function isInCheck(
    position: Position, 
    player: Player
): boolean {
    const playerCache = cache.get(player);
    if(playerCache?.get(position)){
        return playerCache.get(position)!;
    }

    const attackLines = generateLinesOfAttack(position, otherPlayer(player), kingSquare(position, player));
    const checkLine = attackLines.next()
    const isInCheck = checkLine.value !== null;
    playerCache?.set(position, isInCheck);
    return isInCheck;
}

export default isInCheck;