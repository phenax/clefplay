
const Koa = require('koa');
const app = new Koa();

require('babel-core/register')();
const ResponseBuilder = require('./src/main').default;

const PORT = process.env.PORT || 8080;

// Request logging
app.use(async (ctx, next) => {

	const start = process.hrtime();

	// Call the required callback
	await next();

	const diff = process.hrtime(start);
	const diffNumber = (diff[0] * 1000) + (diff[1] / 1000000);

	console.log(`${ctx.method} ${ctx.url} - ${Math.round(diffNumber * 1000) / 1000}ms`);
});


app.use(async ctx => {

	const _resp = ResponseBuilder(ctx);

	ctx.body = _resp.render();
});

app.listen(PORT, () =>
	console.log(`Server has started on ${PORT}`));
