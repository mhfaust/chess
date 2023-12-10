'use client';

import { Theme } from '@radix-ui/themes';
import { SessionProvider } from 'next-auth/react';

type ProvidersProps = {
	children: React.ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
	return (
		<SessionProvider>
			<Theme>
				{children}
			</Theme>
		</SessionProvider>
	);
};

export default Providers;
