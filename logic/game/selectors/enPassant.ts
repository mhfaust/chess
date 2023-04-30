import { file, rank } from 'logic/squares';
import square, { Square } from 'logic/squares/square';
import { GamePlayAndCursor } from 'logic/game/gameState';
import { positionCursor } from 'logic/game/selectors/positions';
import { moves } from './moves';
import { currentGamePlay, gamePlayAt } from './game';

const cache = new Map<string, Square | null>();

const ep = (gamePlay: string) => {

  if (cache.has(gamePlay)){
    return cache.get(gamePlay);
  }

  const epsq = (() => {
    const gpMoves = [...moves({ gamePlay })]; //<--array copy
    if(gpMoves.length === 0) {
      return null;
    }
  
    const last = gpMoves.pop()!; //<--mutate copy.
    if( last === 'RESIGN') {
      return null;
    }
    const [lastFrom] = last;
    if (rank(lastFrom) !== 1 && rank(lastFrom) !== 6){
      return null;
    }
    if (gpMoves.some(([olderFrom]) => olderFrom === lastFrom)) {
      return null;
    }
  
    if (rank(lastFrom) === 1) {
      return square([file(lastFrom), 2])!;
    }
  
    return square([file(lastFrom), 5])!;
  })();

  cache.set(gamePlay, epsq);
  return epsq ?? null;
}

export const epSquare = (state: Pick<GamePlayAndCursor, 'gamePlay'>, i: number) => {
  const gamePlay = gamePlayAt(state.gamePlay, i)
  return ep(gamePlay) || null;
}


export const currentEnPassantSquare = (state: GamePlayAndCursor) => {
  const cursor = positionCursor(state)
  if(cursor === 0){
    return null;
  }
  return ep(currentGamePlay(state))
}

export default currentEnPassantSquare;