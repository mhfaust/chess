'use client'

import ChessBoard from 'app/components/ChessBoard/ChessBoard';
import { useGameStore } from 'app/state/gameStore';
import { PositionName } from 'rules/positions/positionName';
import { canMoveTo } from 'rules/moves';
import { Player } from 'rules/types/Player';
import { playerAt } from 'rules/positions';
import Game from 'app/components/Game';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

export default function GamePage() {
  
  return <Game />
}
