import clsx from "clsx";
import currentPlayer from "logic/game/selectors/players";
import { useGameStore } from "logic/game/useGameStore";
import { otherPlayer } from "logic/squares";
import { Player } from "logic/types/Player";
import styles from './Rotator.module.css';

const arrow: Record<Player, number> = {
  'Black': 8674,
  'White': 8672
}


const RotateButtons = () => {
  
  const rotateBoard = useGameStore(game => game.actions.rotateBoard);
  const orientation = useGameStore(game => game.orientation);
  const thisPlayer = useGameStore(currentPlayer);

  const rotationStyle = { 
    transform: `rotate(${90 * (orientation + 1)}deg)`,
    color: thisPlayer.toLowerCase(),
    backgroundColor: '#aaa',
    // filter: 'drop-shadow(2px 2px 0px #000)',
    // border: '1px solid black'
  }

  return (
    <span 
      onClick={rotateBoard}
      className={clsx(styles.rotator)}
      style={rotationStyle}
      >
        <span
          style={{
            position: 'relative',
            top: '-.05em'
          }}
        >{String.fromCharCode(arrow[thisPlayer])}</span>
    </span>
  )
}

export default RotateButtons;