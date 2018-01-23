
import { h } from 'preact';
import render from 'preact-render-to-string';
import HomePage from './pages/Home';

const Component = () => <HomePage />;

export default ctx => {
	
	const self = {
		Component: Component,
		vdom: <Component />,
		toString: () => render(self.vdom),
		render: () => `<!doctype html>${self}`,
	};

	return self;
};
