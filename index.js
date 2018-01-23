
const Koa = require('koa');
const app = new Koa();

require('babel-core/register')();
const ResponseBuilder = require('./src/main').default;

const PORT = process.env.PORT || 8080;

// Request logging
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});


app.use(async ctx => {

	const _resp = ResponseBuilder(ctx);

	ctx.body = _resp.render();
});

app.listen(PORT, () =>
	console.log(`Server has started on ${PORT}`));
