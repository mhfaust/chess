import clsx from "clsx";
import { boardCursor, boardIndexes, latestBoardCursor } from "logic/game/selectors/boards";
import { useGameStore } from '../GameContainer/useGameStore';
import { useCallback, useEffect } from "react";
import styles from './HistoryNav.module.css';

const HistoryNav = () => {

  const { toggleBoard } = useGameStore(game => game.actions);
  const currentBoardIndex = useGameStore(boardCursor);
  const indexes = useGameStore(boardIndexes);
  const latestBoardIndex = useGameStore(latestBoardCursor);


  const onBodyClick = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft': {
        toggleBoard(Math.max(currentBoardIndex - 1, 0));
        break;
      }
      case 'ArrowRight': {
        toggleBoard(Math.min(currentBoardIndex + 1, latestBoardIndex));
        break;
      }
      default: {
        break;
      }
    }
  }, [currentBoardIndex, latestBoardIndex, toggleBoard])

  useEffect(() => {
    window.addEventListener('keyup', onBodyClick );
    return () => {
        window.removeEventListener('keyup', onBodyClick );
    } 
},[onBodyClick]);

  return (
    <div className={styles.historyNav}>
      {indexes.map((i) => (
        <div 
          key={i}
          onClick={() => toggleBoard(i)}
          className={clsx(styles.boardIndex, {
            [styles.currentIndex]: i === currentBoardIndex
          })}
        >
          {i}
        </div>
      ))}
    </div>
  )
}

export default HistoryNav;