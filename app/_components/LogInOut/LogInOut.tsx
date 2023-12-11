import { auth } from 'app/_auth/auth';
import { logOut } from 'app/serverActions';
import Image from 'next/image';
import Link from 'next/link';

const LogInOut = async () => {
	const session = await auth();

	if (session?.user) {
		const { user: { name, image } } = session;

		return (
			<form action={logOut}>
				{name}
				{image && <Image src={image} alt='user images' height={32} width={32} />}
				<button type='submit'>Log Out</button>
			</form>
		);
	}

	return <Link href='/log-in'>Log In</Link>;
};

export default LogInOut;
