
import { Controller, Action, Resource } from '../../api';

import User from './UsersModel';

@Resource('users')
export default class Users extends Controller {

	@Action(null, 'post')
	add(ctx) {

		const userData = ctx.request.body;

		const user = new User(userData);

		// Validate before saving
		const res = user.check();
		if (!res.isValid) {
			delete res.isValid;
			return ctx.body = { ...res, user: null };
		}

		return user.save()
			.then(user => ctx.body = {
				status: 200,
				message: 'Saved',
				user,
			})
			.catch(e => ctx.body = {
				status: 500,
				message: e.message,
				user: null,
			});
	}

	@Action('/')
	index(ctx) {
		return User.find({})
			.then(users => ctx.body = { users })
			.catch(console.error);
	}

	@Action()
	deleteAll(ctx) {
		return User.deleteMany({})
			.then(d => ctx.body = d);
	}
}
