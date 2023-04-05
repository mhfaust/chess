import Link from 'next/link';
import Game from './components/Game';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */


export default function Home() {

  return (
     <Link href="/game">Play Game</Link>
  )
}
