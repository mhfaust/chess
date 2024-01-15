import { auth } from '@/auth/auth';
import LogIn from '../Login/Login';
import LogOut from '../Logout/Logout';

const LogInOut = async () => {
	const session = await auth();

	return session?.user ? <LogOut /> : <LogIn />;
};

export default LogInOut;
