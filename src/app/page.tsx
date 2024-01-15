import { Button, Flex, Text } from '@radix-ui/themes';
import { createGame } from '@/app/serverActions';
import Link from 'next/link';
import { auth } from '@/auth/auth';
import { Logo } from '../components/Logo/Logo';
import LogOut from '../components/Logout/Logout';

export default async function Home() {
	const session = await auth();
	return (
		<Flex direction='column' align='center' justify='between' gap='9'>
			<Logo mt='9' />
			<h1>Welcome to Chess</h1>
			{session
				? (
					<>
						<Link href='/new-game'>New Game</Link>
						<LogOut />
					</>
				)
				: (
					<>
						<form action={createGame}>
							<Button type='submit'>Play Anonymously</Button>
						</form>
					</>
				)}
		</Flex>
	);
}
