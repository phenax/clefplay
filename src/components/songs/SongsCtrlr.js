
import { Controller, Action, Resource } from '../../api';

import Song from './SongsModel';
import User from '../users/UsersModel';

@Resource('songs')
export default class SongsController extends Controller {

	@Action(null, 'post')
	upload(ctx) {

		const data = ctx.request.body;

		if(data.files && data.fields) {

			const songFile = data.files.song;

			const result = Song.checkFile(songFile);
			if(result) {
				return this.respond(ctx, {
					status: this.status.BAD_REQUEST,
					message: result.message,
					data: { type: result.type }, 
				});
			}

			const song = new Song({ name: data.fields.name });

			// Validate song
			if(!this.validateEntity(ctx, song)) return;

			// Upload file
			this.moveFile(songFile.path, `uploads/${song.id}`);

			// Save song entity with authenticated user
			return User.findOne({})
				.then(user => {
					song.user = user;
					return song.save();
				})
				.then(song => this.respond(ctx, {
					status: 200,
					message: 'Saved',
					data: {
						song: song.normalize(),
					},
				}))
				.catch(e => ctx.body = {
					status: 500,
					message: e.message,
					song: null,
				});
		} else {
			this.respond(ctx, { status: 404, message: 'Not found' });
		}
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
