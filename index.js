
require('dotenv').config();

const chalk = require('chalk');
const mongoose = require('mongoose');
const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');

const log = require('./src/libs/log');

// Babel transpilation for the required modules
require('babel-core/register')();
const ResponseBuilder = require('./src/main.server.js').default;
const router = require('./src/api').default;

const PORT = process.env.PORT;
const app = new Koa();

// Parse body
app.use(bodyParser());

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

// Server static files
app.use(koaStatic('public', {
	maxage: (process.env.NODE_END === 'production')? 60*60*24*10: 0,
	gzip: true,
	br: true,
}));

// Initialize router
router(app);

// For everything else, render html
app.use(async ctx => {
	const _resp = ResponseBuilder(ctx);
	ctx.body = _resp.render();
});


// Start server
app.listen(PORT, () =>
	log(`Server has started on ${PORT}`));


// Connect to database
const connectionUrl =
	process.env.DB_USERNAME?
		`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`:
		`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(connectionUrl);
mongoose.connection
	.on('error', e => console.error('connection error:', e))
	.on('open', () => log(`Connected to database(${connectionUrl})`));

