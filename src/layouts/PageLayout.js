
import { h, Component } from 'preact';

import HtmlWrapper from '../layouts/HtmlWrapper';
import { getStore } from '../store';

const Head = () => (
	<div>

	</div>
);

export default class PageLayout extends Component {

	componentDidMount() {
		if (this.props.title) {
			document.title = this.props.title;
		}
	}

	render() {
		const { head = <Head />, children, ...props } = this.props;

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
