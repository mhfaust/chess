'use client';
import { Flex } from '@radix-ui/themes';
import { auth } from 'app/_auth/auth';
import { facebookLogIn, githubLogIn, googleLogIn } from 'app/serverActions';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LogInPage = () => {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session?.data) {
			return;
		}
		router.push(session?.data?.firstTimeLogin ? '/profile' : '/');
	}, [router, session?.data]);

	return (
		<Flex direction='column' align='center' justify='between' gap='9'>
			<form action={googleLogIn}>
				<button type='submit'>
					Google
				</button>
			</form>
			<form action={facebookLogIn}>
				<button type='submit'>
					Facebook
				</button>
			</form>
			<form action={githubLogIn}>
				<button type='submit'>
					GitHub
				</button>
			</form>
		</Flex>
	);
};

export default LogInPage;
