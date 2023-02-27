import { initialBoard, rotateCounterClockwise } from 'rules/board'
import styles from './page.module.css'
import { unicodeSymbols }  from 'rules/constants/pieces';
import { positionName } from 'rules/positions';

/*
 * think about this lib: https://github.com/Quramy/typed-css-modules
 */

const evenOdd = (mod: number) => [styles.even, styles.odd][mod];

export default function Home() {
  const board = rotateCounterClockwise(initialBoard())

  return (
    <main className={styles.main}>
      {board.map((file, i) => (
        <div className={styles.file} key={i}>
          {file.map((square, j) => (<>
            <div 
              className={`${styles.square} ${evenOdd((i + j) % 2)}`} 
              key={j}
              id={positionName([j, 7-i])!}
            >
              {(square && unicodeSymbols[square]) ?? ' '}
            </div>
          </>
          ))}
        </div>
      ))}
    </main>
  )
}
