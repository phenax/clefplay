
import { Controller, Action, Resource } from '../../api';

import Song from './SongsModel';
import User from '../users/UsersModel';

@Resource('songs')
export default class SongsController extends Controller {

	@Action(null, 'post')
	add(ctx) {

		const song = new Song(ctx.request.body);

		if(!this.validateEntity(ctx, song)) return;

		// TODO: Change this to authenticated user when auth is in
		return User.findOne({})
			.then(user => {
				song.user = user;
				return song.save();
			})
			.then(song => this.respond(ctx, {
				status: 200,
				message: 'Saved',
				data: {
					song: song.normalize()
				},
			}))
			.catch(e => ctx.body = {
				status: 500,
				message: e.message,
				song: null,
			});
	}

	@Action('/')
	index(ctx) {
		return Song.find({})
			.populate('user')
			.then(songs => this.respond(ctx, {
				status: 200,
				message: 'Success',
				data: {
					songs: songs.map(s => s.normalize())
				},
			}))
			.catch(e => this.respond(ctx, {
				status: e.statusCode || 500,
				message: e.message || 'Something went wrong',
				data: { songs: [] },
			}));
	}

	@Action()
	deleteAll(ctx) {
		return Song.deleteMany({})
			.then(d => ctx.body = d);
	}
}
