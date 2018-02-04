/* @flow */

import router from 'koa-route';
import glob from 'glob';
import path from 'path';
import fs from 'fs';

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
 * @param {string|Array<string>} method   Router method
 */
export const Action =
	(name: ?string = null, method: any = 'get') =>
		(_: any, __: any, fnMeta: Function) => {
			Object.assign(fnMeta.value, {
				isAction: true,
				actionName: (name !== null)? name: '/' + fnMeta.value.name,
				actionMethods: (Array.isArray(method)? method: [method]).map(m => m.toLowerCase()),
			});
		};


export class Controller {

	get status() { return {
		OK: 200,
		NOT_FOUND: 404,
		ERROR: 500,
		BAD_REQUEST: 400,
	}; }

	respond(ctx: Object, { status, data = {}, message }: Response) {

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
				status: this.status.BAD_REQUEST,
				message: res.message,
				data: { field: res.field },
			});

			return false;
		}

		return true;
	}

	moveFileToUploads(source, destination) {
		const sourceFile$ = fs.createReadStream(source);
		const destFile$ = fs.createWriteStream(`uploads/${destination}`);

		return sourceFile$.pipe(destFile$);
	}

	streamUploadedFile(ctx, filepath, type = 'text/plain') {
		ctx.type = type;
		const file$ = fs.createReadStream(`uploads/${filepath}`);
		ctx.body = file$;
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

				const { actionName, actionMethods } = action;
				const url = `/${resourceName}${actionName}`;

				// Initialize route
				actionMethods.forEach(method => {
					app.use(router[method](url, action.bind(resource)));
				})
			});
	});
};

