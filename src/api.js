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

	sendUploadedFile(ctx, filepath, type = 'text/plain') {
		ctx.type = type;
		ctx.body = fs.createReadStream(`uploads/${filepath}`);
	}

	streamUploadedFile(ctx, filename, type = 'text/plain') {

		const headers = {
			'Accept-Ranges': 'bytes',
			'Cache-Control': 'no-cache',
			'Access-Control-Allow-Headers': 'range, accept-encoding',
			'Access-Control-Allow-Origin': '*',
		};

		// Not asking for ranged response
		if(!ctx.headers.range) {
			ctx.res.writeHead(200, headers);
			return this.sendUploadedFile(ctx, filename, type);
		}

		const filePath = `uploads/${filename}`;

		let fileStat;
		try {
			fileStat = fs.statSync(filePath);
		} catch(e) {
			return this.respond(ctx, { status: ERROR, message: 'File not found' });
		}

		const range = (ctx.headers.range || '')
			.replace(/bytes=/, '')
			.split('-')
			.map(num => parseInt(num, 10))
			.reduce((carry, num, i) => ({
				...carry,
				[(i === 0)? 'start': 'end']: num,
			}), {});

		if(!range.start) range.start = 0;
		if(!range.end) range.end = fileStat.size;

		if(range.end > fileStat.size || range.start < 0 || range.end < range.start) {
			return this.respond(ctx, {
				status: 416,
				message: 'Requested Range Not Satisfiable',
			})
		}

		let statusCode = 200;
		if(range.start === 0 && range.end === fileStat.size)
			statusCode = 200;

		const contentLength = range.end - range.start;

		ctx.type = type;
		ctx.res.writeHead(statusCode, {
			...headers,
			'Content-Length': contentLength,
            'Content-Range': 'bytes ' + range.start + '-' + range.end + '/' + fileStat.size,
		});

		ctx.body = fs.createReadStream(filePath, range);
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

