
import { Controller, Action, Resource } from '../../api';

import User from './UsersModel';

@Resource('users')
export default class UsersController extends Controller {

	@Action(null, 'post')
	add(ctx) {

		const user = new User(ctx.request.body);

		if(!this.validateEntity(ctx, user)) return;

		return user.save()
			.then(user => this.respond(ctx, {
				status: 200,
				message: 'Saved',
				data: {
					user: user.normalize()
				},
			}))
			.catch(e => this.respond(ctx, {
				status: 500,
				message: e.message,
				data: { user: null },
			}));
	}

	@Action('/')
	index(ctx) {
		return User.find({})
			.populate('songs')
			.then(users => this.respond(ctx, {
				status: 200,
				message: 'Success',
				data: {
					users: users.map(u => u.normalize())
				},
			}))
			.catch(e => this.respond(ctx, {
				status: e.statusCode || 500,
				message: e.message || 'Something went wrong',
				data: { users: [] },
			}));
	}

	@Action()
	deleteAll(ctx) {
		return User.deleteMany({})
			.then(d => ctx.body = d);
	}
}
