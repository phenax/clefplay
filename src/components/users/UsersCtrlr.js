
import { Controller, Action } from '../../api';

import User from './UsersModel';

@Controller('users')
export default class Users {

	@Action('add')
	add(ctx) {
		const user = new User({
			name: 'Akshay',
			email: 'some@email.com',
		});
		// TODO: Save
		ctx.body = { user };
	}

	@Action('')
	index(ctx) {
		return User.find({})
			.then(users => ctx.body = { users })
			.catch(console.error);
	}

}
