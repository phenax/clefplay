
const chalk = require('chalk');
const Koa = require('koa');
const koaStatic = require('koa-static');

const log = require('./src/libs/log');

require('babel-core/register')();
const ResponseBuilder = require('./src/main.server.js').default;

const PORT = process.env.PORT || 8080;
const app = new Koa();

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

app.use(koaStatic('public', {
	maxage: (process.env.NODE_END === 'production')? 60*60*24*10: 0,
	gzip: true,
	br: true,
}));

app.use(async ctx => {

	const _resp = ResponseBuilder(ctx);

	ctx.body = _resp.render();
});

app.listen(PORT, () =>
	log(`Server has started on ${PORT}`));
