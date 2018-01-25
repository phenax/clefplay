
import { h } from 'preact';
import render from 'preact-render-to-string';

import { getStore, refreshStore } from './store';

import App from './App';

/**
 * Response Builder
 */
export default ctx => {

	refreshStore();
	
	const Component = App;
	const vdom = <App url={ctx.path} />;

	const self = {
		Component,
		vdom,
		store: getStore(),
		toString: () => render(self.vdom),
		render: () => `<!doctype html>${self}`,
	};

	return self;
};
