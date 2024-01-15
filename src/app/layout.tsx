import LogInOut from '@/app/_components/LogInOut';
import Providers from '@/app/_components/Providers';
import '@radix-ui/themes/styles.css';
import './globals.css';
import { Avatar } from './_components/Avatar/Avatar';

export const metadata = {
	title: 'Chess',
	description: 'Author: Mike Hildebrand-Faust',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					<Avatar />
					<LogInOut />
					{children}
				</Providers>
			</body>
		</html>
	); //
}
