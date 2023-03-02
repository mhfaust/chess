import { unicodeSymbols } from "rules/constants/pieces";
import { Piece } from "rules/positions/piece"

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