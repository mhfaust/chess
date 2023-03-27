import clsx from 'clsx';
import { unicodeSymbols } from 'logic/constants/pieces';
import { Piece } from 'logic/squares/piece'

import styles from './Captures.module.css'

type CapturesProps = {
  captures: Piece[];
  player: 'black' | 'white'
}

const Captures = ({ captures, player }: CapturesProps) => {

  return (
    <div className={clsx(styles.captures, styles[player])}>
      {captures.map((piece, i) => (
        <span key={i} >
          {unicodeSymbols[piece]}
        </span>
      ))}
    </div>
  )
};

export default Captures;