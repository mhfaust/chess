import { initialBoard } from 'logic/board'
import Game from './components/Game';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

const board = initialBoard();


export default function Home() {

  return (
     <Game />
  )
}
