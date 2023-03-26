import { unicodeSymbols } from 'logic/constants/pieces';
import { Piece } from 'logic/squares/piece'

import styles from './Captures.module.css'

type CapturesProps = {
  captures: Piece[];
}

const Captures = ({ captures }: CapturesProps) => {

  return (
    <div className={styles.captures} style={{
      height: captures.length ? "1.5em" : "0em"
    }}>
      {captures.map((piece, i) => (
        <span key={i} >
          {unicodeSymbols[piece]}
        </span>
      ))}
    </div>
  )
};

export default Captures;