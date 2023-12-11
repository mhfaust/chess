import { auth } from 'app/auth';
import { facebookLogIn, githubLogIn, googleLogIn } from 'app/serverActions';

const LogInPage = () => {
	// TODO: if already signed in, redirect somewhere.

	return (
		<div>
			<form action={googleLogIn}>
				<button type='submit'>Google</button>
			</form>
			<form action={facebookLogIn}>
				<button type='submit'>Facebook</button>
			</form>
			<form action={githubLogIn}>
				<button type='submit'>GitHub</button>
			</form>
		</div>
	);
};

export default LogInPage;
