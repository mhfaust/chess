import GameContainer from '@/components/GameContainer/GameContainer';
import { db } from '@/db';
import { notFound } from 'next/navigation';
import styles from './play.module.css';

type PlayProps = {
	params: {
		id: string;
	};
};

export default async function PlayPage({ params }: PlayProps) {
	const game = await db.game.findFirst({
		where: { id: params.id },
	});
	if (!game) {
		return notFound();
	}

	console.log(game.gamePlay);

	return (
		<div className={styles.playWrapper}>
			<GameContainer
				initialGamePlay={game?.gamePlay || ''}
				initialPosition='last'
				// initialGamePlay='f2f3,e7e5,g2g4,d8h4'
				// initialGamePlay='e2e4,d7d6,d2d4,g8f6,b1c3,g7g6,c1e3,f8g7,d1d2,c7c6,f2f3,b7b5,g1e2,b8d7,e3h6,g7h6,d2h6,c8b7,a2a3,e7e5,e1c1,d8e7,c1b1,a7a6,e2c1,e8c8,c1b3,e5d4,d1d4,c6c5,d4d1,d7b6,g2g3,c8b8,b3a5,b7a8,f1h3,d6d5,h6f4,b8a7,h1e1,d5d4,c3d5,b6d5,e4d5,e7d6,d1d4,c5d4,e1e7,a7b6,f4d4,b6a5,b2b4,a5a4,d4c3,d6d5,e7a7,a8b7,a7b7,d5c4,c3f6,a4a3,f6a6,a3b4,c2c3,b4c3,a6a1,c3d2,a1b2,d2d1,h3f1,d8d2,b7d7,d2d7,f1c4,b5c4,b2h8,d7d3,h8a8,c4c3,a8a4,d1e1,f3f4,f7f5,b1c1,d3d2,a4a7'
				className={styles.playBoard}
			/>
		</div>
	);
}
