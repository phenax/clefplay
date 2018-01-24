
const chalk = require('chalk');

const getPrefix = () => `[${(new Date()).toUTCString()}]`;

const log = (...messages) =>
	console.log(chalk.bold(getPrefix()), ...messages);

const warn = (...message) =>
	console.log(...[chalk.bold(getPrefix()), 'LOG', ...message].map(m => chalk.yellow(m)));

const error = (...message) =>
	console.log(...[chalk.bold(getPrefix()), 'ERROR', ...message].map(m => chalk.red(m)));

Object.assign(log, {
	log,
	warn,
	error,
});

module.exports = log;
