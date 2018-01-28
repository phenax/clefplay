
import router from 'koa-route';
import glob from 'glob';
import path from 'path';

const CONTROLLER_SUFFIX = 'Ctrlr';


/**
 * Resource decorator
 * @param {String} name  Resource name
 */
export const Resource =
	name =>
		_class => { _class.resourceName = name; };

/**
 * Action(Controller method) decorator
 * 
 * @param {*} name     Action name
 * @param {*} method   Router method
 */
export const Action =
	(name = null, method = 'get') =>
		(_, __, fnMeta) => {
			Object.assign(fnMeta.value, {
				isAction: true,
				actionName: (name !== null)? name: '/' + fnMeta.value.name,
				actionMethod: method.toLowerCase(),
			});
		};


export class Controller {

	respond(ctx, status, data, message) {
		ctx.body = { status, message, ...data };
	}
}





/**
 * List of all controllers
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
				app.use(router[actionMethod](url, action));
			});
	});
};

