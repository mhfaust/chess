// 'use client'

import GameContainer from 'app/components/GameContainer';
import styles from './play.module.css'

export default function GamePage() {

  
  return (
    <div className={styles.playWrapper}>
      <GameContainer 
        initialGamePlay=''
        className={styles.playBoard}
      />
    </div>
  );
}
