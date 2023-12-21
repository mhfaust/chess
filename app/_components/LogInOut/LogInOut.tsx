import { auth } from 'app/_auth/auth';
import { logOut } from 'app/serverActions';
import Image from 'next/image';
import Link from 'next/link';
import LogIn from '../Login/Login';
import LogOut from '../Logout/Logout';

const LogInOut = async () => {
	const session = await auth();

	return session?.user ? <LogOut /> : <LogIn />;
};

export default LogInOut;
