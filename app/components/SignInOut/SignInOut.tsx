import { githubSignIn, signOut } from 'app/actions';
import { auth } from 'app/auth';
import Image from 'next/image';
import Link from 'next/link';

const SignInOut = async () => {
	const session = await auth();

	if (session?.user) {
		const { user: { name, image } } = session;

		return (
			<form action={signOut}>
				{name}
				{image && <Image src={image} alt='user images' height={32} width={32} />}
				<button type='submit'>Sign Out</button>
			</form>
		);
	}

	return <Link href='/sign-in'>Sign In</Link>;
};

export default SignInOut;
