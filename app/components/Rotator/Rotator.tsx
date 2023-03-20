import clsx from "clsx";
import { useGameStore } from "logic/game/useGameStore";
import styles from './Rotator.module.css';



const RotateButtons = () => {
  
  const rotateBoard = useGameStore(game => game.actions.rotateBoard);
  const orientation = useGameStore(game => game.orientation);

  const rotationStyle = { transform: `rotate(${90 * (orientation)}deg)`}

  return (
    <span 
      onClick={rotateBoard}
      className={clsx(styles.rotator)}
      style={rotationStyle}
      >
        &#8635;
    </span>
  )
}

export default RotateButtons;