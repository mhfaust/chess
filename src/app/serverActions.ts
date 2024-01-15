'use server';

import * as auth from '@/auth/auth';
import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function createGame() {
	const game = await db.game.create({
		data: {
			gamePlay: '',
			white: '',
			black: '',
		},
	});

	console.log(game);

	redirect(`/play/${game.id}`);
}

export async function recordMove(gameId: string, newGamePlay: string) {
	return db.game.update({
		where: {
			id: gameId,
		},
		data: {
			gamePlay: newGamePlay,
		},
	});
}

export async function githubLogIn() {
	return auth.signIn('github');
}

export async function googleLogIn() {
	return auth.signIn('google');
}

export async function facebookLogIn() {
	return auth.signIn('facebook');
}

export async function logOut() {
	return auth.signOut();
}
