
import { Controller, Action, Resource } from '../../api';

import User from './UsersModel';

@Resource('users')
export default class Users extends Controller {

	@Action(null, 'post')
	add(ctx) {

		const userData = ctx.request.body;

		const user = new User(userData);

		return user.save()
			.then(user => ctx.body = { user })
			.catch(e => {
				ctx.body = {
					message: e.message,
					status: 500,
				};
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
