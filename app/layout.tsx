import SignInOut from 'app/_components/SignInOut';
import Providers from 'app/Providers';
import '@radix-ui/themes/styles.css';
import './globals.css';

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
					<SignInOut />
					{children}
				</Providers>
			</body>
		</html>
	);
}
