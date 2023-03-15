import { generateLinesOfAttack }  from 'logic/check'
import { Player }  from 'logic/types/Player';
import { Board }  from 'logic/types/Board';
import kingSquare  from 'logic/positions/kingSquare';

const cache = new Map<Player, Map<Board, boolean>>()
    .set('Black', new Map())
    .set('White', new Map())

function isInCheck(
    board: Board, 
    player: Player
): boolean {
    const playerCache = cache.get(player);
    if(playerCache?.get(board)){
        return playerCache.get(board)!;
    }

    const attackLines = generateLinesOfAttack(board, player, kingSquare(board, player));
    const checkLine = attackLines.next()
    const isInCheck = checkLine.value !== null;
    playerCache?.set(board, isInCheck);
    return isInCheck;
}

export default isInCheck;