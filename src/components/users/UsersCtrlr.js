
import { Controller, Action } from '../../api';

@Controller('users')
export default class Users {

	@Action('add')
	add(ctx) { ctx.body = 'users add'; }

	@Action(':name?')
	index(ctx, param) { ctx.body = 'users index ' + param; }

}
