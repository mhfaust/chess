import clsx from "clsx";
import currentPlayer from "logic/game/selectors/players";
import { useGameStore } from "logic/game/useGameStore";
import styles from './Rotator.module.css';

const RotateButtons = () => {
  
  const rotateBoard = useGameStore(game => game.actions.rotateBoard);
  const orientation = useGameStore(game => game.orientation);

  const rotationStyle = { 
    transform: `rotate(${90 * (orientation + 1) + 225}deg)`,
  };

  return (
    <span 
      onClick={rotateBoard}
      className={clsx(styles.rotator)}
      style={rotationStyle}
      title='Click here to rotate to board.'
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 473.026 473.026" 
        ><path style={{fill:'#010002'}} d="M358.503 121.494 214.4 207.072a3.337 3.337 0 0 0-1.601 2.471.812.812 0 0 0 0 .341L125.01 357.653l1.52 1.52 147.33-87.512c.244.065.504.089.756.089l.39-.024a3.24 3.24 0 0 0 2.463-1.585l85.578-144.095c.553-.943.553-2.105-.024-3.113-.911-1.634-3.057-2.325-4.52-1.439zm-7.82 12.363-76.75 129.212-52.454-52.454 129.204-76.758z"/></svg>
    </span>
  )
}

export default RotateButtons;