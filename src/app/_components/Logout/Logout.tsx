import { auth } from '@/app/_auth/auth';
import { logOut } from '@/app/serverActions';
import Image from 'next/image';

const LogOut = async () => {
	const session = await auth();

	if (session?.user) {
		const { user: { name, image } } = session;

		return (
			<form action={logOut}>
				<button type='submit'>Log Out</button>
			</form>
		);
	}

	return null;
};

export default LogOut;
