
const chalk = require('chalk');
const Koa = require('koa');
require('babel-core/register')();

const ResponseBuilder = require('./src/main').default;
const log = require('./src/libs/log');

const PORT = process.env.PORT || 8080;
const app = new Koa();

log.warn('Hello world');
log.error('Shit fuck');

// Request logging
app.use(async (ctx, next) => {

	const start = process.hrtime();

	// Call the required callback
	await next();

	const diff = process.hrtime(start);
	const diffNumber = (diff[0] * 1000) + (diff[1] / 1000000);

	const method = chalk.green(`[${ctx.method}]`);
	const url = chalk.bold(ctx.url);
	const responseTime = chalk.blue(`${Math.round(diffNumber * 1000) / 1000}ms`);

	log(`${method} ${url} - ${responseTime}`);
});


app.use(async ctx => {

	const _resp = ResponseBuilder(ctx);

	ctx.body = _resp.render();
});

app.listen(PORT, () =>
	log(`Server has started on ${PORT}`));
