import LogInOut from '@/components/LogInOut';
import Providers from '@/components/Providers';
import { Inter as FontSans } from "next/font/google"
import '@radix-ui/themes/styles.css';
import './globals.css';
import { Avatar } from '../components/Avatar/Avatar';
import { cn } from '@/utils/tailwind'

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
			<body
				className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
			>
				<Providers>
					<Avatar />
					<LogInOut />
					{children}
				</Providers>
			</body>
		</html>
	); //
}
