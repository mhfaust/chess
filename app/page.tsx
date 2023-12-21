import { Button, Flex, Text } from '@radix-ui/themes';
import { createGame } from 'app/serverActions';
import { Logo } from './_components';
import LogIn from './_components/Login/Login';

export default function Home() {
	return (
		<Flex direction='column' align='center' justify='between' gap='9'>
			<Logo mt='9' />
			<h1>Welcome to Chess</h1>
			<form action={createGame}>
				<button type='submit'>Play Anonymously</button>
			</form>
			<LogIn />
		</Flex>
	);
}
