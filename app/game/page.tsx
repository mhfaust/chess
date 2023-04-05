// 'use client'

import Game from 'app/components/Game';
import { GameProvider } from 'app/components/Game/GameProvider';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

export default function GamePage() {
  
  return (
    <GameProvider initialGamePlay=''>
      <Game />
    </GameProvider>
  );
}
