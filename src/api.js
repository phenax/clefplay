
import router from 'koa-route';

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

}








/**
 * List of all controllers
 */
export const controllers = [
	require('./components/users/UsersCtrlr').default,
];

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

