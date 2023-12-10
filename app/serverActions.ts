'use server';

import * as auth from 'app/auth';
import { db } from 'app/db';
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

export async function githubSignIn() {
	return auth.signIn('github');
}

export async function googleSignIn() {
	return auth.signIn('google');
}

export async function facebookSignIn() {
	return auth.signIn('facebook');
}

export async function signOut() {
	return auth.signOut();
}
