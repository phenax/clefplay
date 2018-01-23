import { h } from 'preact';

import HtmlWrapper from '../layouts/HtmlWrapper';

const initialState = {};

const Head = () => (
	<div>

	</div>
);

export default ({ ...props, head = (<Head />), children }) => (
	<HtmlWrapper head={head} {...props}>
		<div id='appRoot'>
			{children}
		</div>
		<script dangerouslySetInnerHTML={{ __html: `
			window.__INITIAL_STATE = ${initialState};
		` }} />
	</HtmlWrapper>
);
