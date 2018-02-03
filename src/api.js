/* @flow */

import router from 'koa-route';
import glob from 'glob';
import path from 'path';

const CONTROLLER_SUFFIX = 'Ctrlr';

type Response = {
	status: number,
	data: Object,
	message: string,
};


/**
 * Resource decorator
 * @param {string} name  Resource name
 */
export const Resource =
	(name: string) =>
		(_class: Function) => { _class.resourceName = name; };

/**
 * Action(Controller method) decorator
 * 
 * @param {?string} name     Action name
 * @param {string} method   Router method
 */
export const Action =
	(name: ?string = null, method: string = 'get') =>
		(_: any, __: any, fnMeta: Function) => {
			Object.assign(fnMeta.value, {
				isAction: true,
				actionName: (name !== null)? name: '/' + fnMeta.value.name,
				actionMethod: method.toLowerCase(),
			});
		};


export class Controller {

	get statuses() { return {
		OK: 200,
		NOT_FOUND: 404,
		ERROR: 500,
		INVALID_FIELD: 444,
	}; }

	respond(ctx: Object, { status, data, message }: Response) {

		ctx.status = status;
		ctx.message = message;

		ctx.body = { status, message, ...data };
	}

	// Validate entity
	validateEntity(ctx: Object, entity: Object) {

		const res = entity.check();

		if (!res.isValid) {
			delete res.isValid;

			this.respond(ctx, {
				status: this.statuses.INVALID_FIELD,
				message: res.message,
				data: { field: res.field },
			});

			return false;
		}

		return true;
	}
}

export class ModelEntity {

	normalize() {

		const entity = this.toObject();

		return { ...entity };
	}
}




/**
 * List of all controllers(Glob it all out of the components folder)
 */
export const controllers =
	glob.sync(`${path.resolve('./src/components')}/**/*${CONTROLLER_SUFFIX}.js`)
		.map(file => require(file).default);


export default (app) => {

	// Other routes initialized here

	// Controller actions here
	controllers.map(Ctrlr => {

		const { resourceName } = Ctrlr;
		const resource = new Ctrlr();

		Object.getOwnPropertyNames(Ctrlr.prototype)
			.map(key => resource[key])
			.filter(action => typeof action === 'function')
			.filter(action => action.isAction)
			.forEach(action => {

				const { actionName, actionMethod } = action;
				const url = `/${resourceName}${actionName}`;

				// Initialize route
				app.use(router[actionMethod](url, action.bind(resource)));
			});
	});
};

