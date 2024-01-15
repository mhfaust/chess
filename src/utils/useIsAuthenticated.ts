import { useSession } from 'next-auth/react';

const useIsAuthenticated = () => {
	console.log(useSession);
	const session = useSession();
	return session?.status === 'authenticated';
	return true;
};

export default useIsAuthenticated;
