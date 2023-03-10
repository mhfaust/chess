import { unicodeSymbols } from 'logic/constants/pieces';
import { Piece } from 'logic/positions/piece'

import styles from './Captures.module.css'

type CapturesProps = {
  captures: Piece[];
}

const Captures = ({ captures }: CapturesProps) => {

  return (
    <div className={styles.captures}>
      {captures.map((piece, i) => (
        <span key={i} >
          {unicodeSymbols[piece]}
        </span>
      ))}
    </div>
  )
};

export default Captures;