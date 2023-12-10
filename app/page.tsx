import { createGame } from 'app/actions';
import Providers from 'app/Providers';

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
