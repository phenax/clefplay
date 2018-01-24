
import { h } from 'preact';
import render from 'preact-render-to-string';

import ComponentRoot from './ComponentRoot';

/**
 * Response Builder
 */
export default ctx => {

	// TODO: Store initialization
	
	const Component = ComponentRoot;
	const vdom = <ComponentRoot url={ctx.path} />;

	const self = {
		Component,
		vdom,
		toString: () => render(self.vdom),
		render: () => `<!doctype html>${self}`,
	};

	return self;
};
