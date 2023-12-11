import Providers from 'app/_components/Providers';
import { createGame } from 'app/serverActions';

export default function Home() {
	return (
		<Providers>
			<div>
				<form action={createGame}>
					<button type='submit'>Play</button>
				</form>
			</div>
		</Providers>
	);
}
