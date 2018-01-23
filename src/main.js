
import { h } from 'preact';
import render from 'preact-render-to-string';

import ComponentRoot from './ComponentRoot';

export default ctx => {
	
	const Component = ComponentRoot;
	const vdom = <ComponentRoot url={ctx.path} />

	const self = {
		Component,
		vdom,
		toString: () => render(self.vdom),
		render: () => `<!doctype html>${self}`,
	};

	return self;
};
