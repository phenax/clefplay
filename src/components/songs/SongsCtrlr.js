
import { Controller, Action, Resource } from '../../api';

import Song from './SongsModel';

@Resource('songs')
export default class SongsController extends Controller {

	@Action(null, 'post')
	add(ctx) {

		const song = new Song(ctx.request.body);

		// Validate before saving
		const res = song.check();
		if (!res.isValid) {
			delete res.isValid;
			return ctx.body = { ...res, song: null };
		}

		return song.save()
			.then(song => ctx.body = {
				status: 200,
				message: 'Saved',
				song,
			})
			.catch(e => ctx.body = {
				status: 500,
				message: e.message,
				song: null,
			});
	}

	@Action('/')
	index(ctx) {
		return Song.find({})
			.then(songs => ctx.body = { songs })
			.catch(console.error);
	}

	@Action()
	deleteAll(ctx) {
		return Song.deleteMany({})
			.then(d => ctx.body = d);
	}
}
