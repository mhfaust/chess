'use client';

import * as RadixAvatar from '@radix-ui/react-avatar';
import { Box } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export const Avatar = () => {
	const session = useSession();

	if (!session?.data?.user || !session?.data?.user?.image) {
		return null;
	}

	return (
		<Box position='absolute' top='0' right='0' m='4'>
			<Image src={session.data.user.image} alt={session.data.user.name || 'name unkown'} width={32} height={32} />
		</Box>
	);
};
