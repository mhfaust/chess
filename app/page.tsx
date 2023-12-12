import { createGame } from 'app/serverActions';

export default function Home() {
	return (
		<div>
			<form action={createGame}>
				<button type='submit'>Play</button>
			</form>
		</div>
	);
}
