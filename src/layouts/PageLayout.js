
import { h, Component } from 'preact';

import HtmlWrapper from '../layouts/HtmlWrapper';
import { getStore } from '../store';

export default class PageLayout extends Component {

	componentDidMount() {
		// For client side, set the title on mount
		if (this.props.title) {
			document.title = this.props.title;
		}
	}

	render() {

		const { head = null, children, ...props } = this.props;

		// For a browser, dont need the html stuff and script loading
		if(process.env.ENV === 'browser') {
			return <div>{children}</div>;
		}
		
		return (
			<HtmlWrapper head={head} {...props}>

				<div id='appRoot'>{children}</div>

				<script dangerouslySetInnerHTML={{
					__html: `window.__INITIAL_STATE = ${JSON.stringify(getStore().getState())};`
				}} />

				<script src={'/js/script.js'} async defer />

			</HtmlWrapper>
		);
	}
}
